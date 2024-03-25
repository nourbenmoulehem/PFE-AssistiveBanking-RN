import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';

// storage
import * as Keychain from 'react-native-keychain';

// api manage (custom hook)
import getApi from '../../API/APIManager';

// navigation
import {RootStackParamListSignedIn} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { DarkTheme } from '@react-navigation/native';

type HomeProps = NativeStackScreenProps<RootStackParamListSignedIn, 'Home'>;

const Home = ({navigation}: HomeProps) => {
  const dispatch = useDispatch();
  const {isLoggedIn, mode, user} = useSelector(
    (state: RootState) => state.global,
  );
  console.log('🚀 ~ Home ~ isLoggedIn:', isLoggedIn);
  const colors = tokens(mode);
  const [clientDetails, setClientDetails] = useState<Object>({});
  

  // useEffect(() => {
  //   getClientDetails();
  // }, []);

  // const getClientDetails = async () => {
  //   const api = await getApi();
  //   if (api) {
  //     let response = await api.get('/api/v1/client/get-by-cin?cin=123456789');
  //     console.log('🚀 ~ getClientDetails ~ response.data:', response.data);
  //     if (response.status === 200) {
  //       setClientDetails(response.data);
  //     }
  //   } else {
  //     // Handle the case where there is no API (e.g., show an error message)
  //   }
  // };
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor, 
      
    },
    mini:{
      padding: 20 ,
      marginStart:20,
      marginEnd: 20,
    },
    rectangle: {
      width: wp('95%'), 
      backgroundColor: '#fb8500',
      borderRadius: 20,
      marginBottom: 10,
      padding: 20,
    },
    welcome: {
      fontSize: hp('3%'),
      fontWeight: 'bold' ,
      color: colors.main.fontColor
  
    },
    prompt: {
      fontSize: hp('2.5%'),
      fontWeight: 'bold' ,
      textAlign: 'center',
      paddingTop:hp('6%'),
    },
    solde: {
      fontSize: hp('10%'),
      fontWeight: 'bold' ,
      textAlign: 'center',
      color: 'white',
    }
  });
  return (
    <View style={styles.container}>
      
      
      <Text style={styles.welcome}>Bienvenu, foulen </Text>
      <View style={styles.rectangle}>
      <Text style={styles.prompt}>Votre solde disponible </Text>
      <Text style={styles.solde} >1000</Text>
      
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
        <Text>transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;


