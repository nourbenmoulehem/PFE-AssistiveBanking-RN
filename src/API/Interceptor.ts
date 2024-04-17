import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import * as Keychain from 'react-native-keychain';
import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';
import base64 from 'base-64';
import { API_BASE_URL } from '@env';
import { StringSchema } from 'yup';

// import { setLogout } from '../context/globalReducer';
// import { useDispatch } from 'react-redux';

global.atob = base64.decode; // for jwt-decode



const getApi = async (): Promise<AxiosInstance | undefined> => {
  console.log('🚀 ~ getApi ~ getApi');

  
  try {
    const accessToken = await Keychain.getGenericPassword({service: 'accessService'});
    const refreshToken = await Keychain.getGenericPassword({service: 'refreshService'});
    
    if (accessToken && refreshToken) {

      const axiosInstance = axios.create({
        baseURL: process.env.API_BASE_URL,
        withCredentials: true,
        headers: {Authorization: `Bearer ${refreshToken.password}`},
        responseType: 'json',
      });
      
      
      // on request middleware to verify token
      axiosInstance.interceptors.request.use(async req => {
        
        // check if access token is expired
        const user = jwtDecode(accessToken.password);
        const isExpired = dayjs.unix(user.exp as number).diff(dayjs()) < 1;
        // isExpired true then token has expired if false then token is still valid
        console.log('🚀 ~ getApi ~ isExpired:', isExpired);
        
        // if token is not expired then return the request and move on to the actual request
        if (!isExpired) return req;

        // if token is expired then refresh the access token
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh-token`, {}, {
          headers: {Authorization: `Bearer ${refreshToken.password}`},
        });

        // save new access token
        await Keychain.setGenericPassword('accessToken', response.data.access_token, {service: 'accessService'});
        // i might delete cause no need, but let's keep it for now
        await Keychain.setGenericPassword('refreshToken', response.data.refresh_token, {service: 'refreshService'});

        return req;
      });
      
      

      return axiosInstance ;

    } else {
      console.log('log out!!!');

      // Dispatch logout action
      // dispatch(logout());
    }
  } catch (error) {
    console.error('Failed to get credentials:', error);
    // Handle error (e.g., show an error message to the user)
  }
};

export const baseQuery = async ({ url, method, body }: { url: string, method: string, body?: any }) => {
  const axios = await getApi();
  if (!axios) {
    return { error: { message: 'Not authenticated' } };
  }
  try {
    const response = await axios( url,{ method, data: body });
    return { data: response.data };
  } catch (axiosError: any) {
    return { error: { message: axiosError.message } };
  }
};

export default baseQuery;