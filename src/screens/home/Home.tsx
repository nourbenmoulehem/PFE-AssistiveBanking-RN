import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { tokens } from '../../assets/palette';
import { Divider, List, Icon } from 'react-native-paper';
// storage
import * as Keychain from 'react-native-keychain';

// api manage (custom hook)
import getApi from '../../API/APIManager';

// navigation
import { RootStackParamListSignedIn } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DarkTheme } from '@react-navigation/native';

type HomeProps = NativeStackScreenProps<RootStackParamListSignedIn, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const dispatch = useDispatch();
  const { isLoggedIn, mode, user } = useSelector(
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
    container: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,

    },
    miniContainer: {
      margin: wp(1),
      padding: wp(1),
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    midContainer: {
      width: wp(100),
      padding: hp(3),

      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    btnContainer: {
      margin: wp(1),
      padding: wp(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.main.rectangleColor,
      borderRadius: hp(2),
    },
    rectangle: {
      width: wp('100%'),
      backgroundColor: colors.main.rectangleColor,
      marginBottom: 10,
    },
    welcome: {
      fontSize: hp('2%'),
      textAlign: 'center',
      color: colors.main.fontColor,
      margin:hp(2)
    },
    prompt: {
      fontSize: hp('2.5%'),
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: hp('6%'),
      color: colors.main.fontColor,
    },
    solde: {
      fontSize: hp('10%'),
      fontWeight: 'bold',
      textAlign: 'center',
      color: mode === 'dark' ? colors.secondaryAccent[200] : colors.accent[100],
    },
    devider: {
      width: wp('100%'),
      backgroundColor: mode === 'dark' ? colors.background[500] : colors.background[0],
    },
    icon: {
      width: hp(7),
      height: hp(7),
      borderRadius: hp(2),
      backgroundColor: mode === 'dark' ? colors.background[300] : colors.background[500],
      justifyContent: 'center',
      alignItems: 'center',

    },

  });
  return (
    <View style={styles.container}>



      <View style={styles.rectangle}>
        <Text style={styles.welcome}>Bienvenu, foulen </Text>
        <Text style={styles.prompt}>Votre solde disponible </Text>
        <Text style={styles.solde} >1000DT</Text>
        <Divider style={styles.devider} />
        <View style={styles.miniContainer}>
          <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' }}>Numero de compte</Text>
          <Text style={{ color: mode === 'dark' ? colors.secondary[100] : colors.secondary[100], fontWeight: 'bold' }}>0012341234512345</Text>
        </View>
        <Divider style={styles.devider} />
        <View style={styles.miniContainer}>
          <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' }}>Solde de compte</Text>
          <Text style={{ color: mode === 'dark' ? colors.secondary[100] : colors.secondary[100], fontWeight: 'bold'  }}>3000DT</Text>
        </View>
      </View>
      <View style={styles.midContainer}>
        <TouchableOpacity onPressIn={() => navigation.navigate('Transactions')}>
          <View style={styles.btnContainer} >
            <View style={styles.icon}>
              <Icon source="history" size={hp(5)} color={colors.accent[300]} />
            </View>
            <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' , marginEnd:wp(3)}}>Historique Mouvements</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => navigation.navigate('Transactions')}>
          <View style={styles.btnContainer} >
            <View style={styles.icon}>
            <Icon source="card-text" size={hp(5)} color={colors.accent[300]} />
            </View>
            <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' , marginEnd:wp(3)}}>Votre Carte</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => navigation.navigate('Transactions')}>
          <View style={styles.btnContainer} >
            <View style={styles.icon}>
            <Icon source="bank-transfer" size={hp(5)} color={colors.accent[300]} />
            </View>
            <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' , marginEnd:wp(3)}}>Effectuer un virement</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => navigation.navigate('Transactions')}>
          <View style={styles.btnContainer} >
            <View style={styles.icon}>
            <Icon source="transfer-down" size={hp(5)} color={colors.accent[300]} />
            </View>
            <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' , marginEnd:wp(3)}}>Historique Virements</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default Home;


