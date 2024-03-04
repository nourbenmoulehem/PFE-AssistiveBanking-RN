import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../context/store';


// storage
import * as Keychain from 'react-native-keychain';

// api manage (custom hook)
import getApi from '../../API/APIManager';

// navigation
import {RootStackParamListSignedIn} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type HomeProps = NativeStackScreenProps<RootStackParamListSignedIn, 'Home'>;

const Home = ({navigation}: HomeProps) => {
  const dispatch = useDispatch();
  const {isLoggedIn, mode, user} = useSelector(
    (state: RootState) => state.global,
  );
  console.log('🚀 ~ Home ~ isLoggedIn:', isLoggedIn);
  
  const [clientDetails, setClientDetails] = useState<Object>({});

  useEffect(() => {
    getClientDetails();
  }, []);

  const getClientDetails = async () => {
    const api = await getApi();
    if (api) {
      let response = await api.get('/api/v1/client/get-by-cin?cin=123456789');
      console.log('🚀 ~ getClientDetails ~ response.data:', response.data);
      if (response.status === 200) {
        setClientDetails(response.data);
      }
    } else {
      // Handle the case where there is no API (e.g., show an error message)
    }
  };

  return (
    <View>
      <Text>Home Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
        <Text>transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
