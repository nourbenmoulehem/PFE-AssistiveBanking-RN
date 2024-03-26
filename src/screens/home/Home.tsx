import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';
import { Divider,List, MD3Colors } from 'react-native-paper';
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
    miniContainer:{
      margin:wp(1),
      padding:wp(1),
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    midContainer:{
      width:wp(100),
      padding:hp(3),

      flexDirection: 'column',
      justifyContent:'space-between'
    },
    btnContainer:{
      margin:wp(1),
      padding:wp(6),
      flexDirection: 'row',
      justifyContent:'space-between',
      backgroundColor: colors.main.rectangleColor,
      borderRadius: hp(2),
    },
    rectangle: {
      width: wp('100%'), 
      backgroundColor:colors.main.rectangleColor,
      marginBottom: 10,
    },
    welcome: {
      fontSize: hp('2.5%'),
      fontWeight: 'bold' ,
      color: colors.main.fontColor,
      margin: hp('2%')
  
    },
    prompt: {
      fontSize: hp('2.5%'),
      fontWeight: 'bold' ,
      textAlign: 'center',
      paddingTop:hp('6%'),
      color: colors.main.fontColor,
    },
    solde: {
      fontSize: hp('10%'),
      fontWeight: 'bold' ,
      textAlign: 'center',
      color:  mode === 'dark' ? colors.orange[500] : colors.orange[300],
    },
    devider: {
      width: wp('100%'),
      backgroundColor: 'black'
    },

  });
  return (
    <View style={styles.container}>
      
      
      
      <View style={styles.rectangle}>
      <Text style={styles.welcome}>Bienvenu, foulen </Text>
      <Text style={styles.prompt}>Votre solde disponible </Text>
      <Text style={styles.solde} >1000DT</Text>
      <Divider style={styles.devider} />
      <View  style={styles.miniContainer}>
        <Text style={{color:colors.main.fontColor, fontWeight:'bold'}}>Numero de compte</Text>
        <Text style={{color:mode === 'dark' ? colors.orange[500] : colors.orange[300], fontWeight:'bold'}}>0012341234512345</Text>
      </View>
      </View>
      <View style={styles.midContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
        <View style={styles.btnContainer} >
        <List.Icon icon="history" />
        <Text>Historique Mouvements</Text>
        </View>
        </TouchableOpacity>
       
        <View style={styles.btnContainer} >
        <List.Icon icon="card" />
        <Text>Votre Carte</Text>
        </View>
        <View style={styles.btnContainer} >
        <List.Icon icon="upload" />
        <Text>Effectuer un virement</Text>
        </View>
        <View style={styles.btnContainer} >
        <List.Icon icon="folder" />
        <Text>Historique Virements</Text>
        </View>

      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
        <Text>transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;


