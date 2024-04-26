// import { string } from "yup";
// import axiosInstance from "./interceptor";

// const axiosBaseQuery =
//   ({ baseUrl } = { baseUrl: "" }) =>
//   async ({ url, method, data, params, headers, body }: {{ url: string, method: any, data: any, params: any, headers: any, body: any }}) => {
//     try {
//       const result = await axiosInstance({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         headers,
//         body,
//       });
//       return Promise.resolve(result);
//     } catch (axiosError) {
//       return Promise.reject(axiosError?.response?.data); // Should return in this format only, becasuse in order to populate error from axios interceptor "return response.data"
//     }
//   };

// export default axiosBaseQuery;