import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Divider, List, Icon } from 'react-native-paper';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { tokens } from '../../assets/palette';


// storage
import * as Keychain from 'react-native-keychain';

// api manage (custom hook)
import getApi from '../../API/APIManager';

// navigation
import { RootStackParamListSignedIn } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DarkTheme } from '@react-navigation/native';
import { useGetClientsQuery } from '../../API/ClientApi';

type HomeProps = NativeStackScreenProps<RootStackParamListSignedIn, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const {data, isLoading, error} = useGetClientsQuery(1);
  console.log("🚀 ~ home:", data , error)

  const dispatch = useDispatch();
  const { isLoggedIn, mode, user } = useSelector(
    (state: RootState) => state.global,
  );
  console.log('🚀 ~ Home ~ isLoggedIn:', isLoggedIn);
  const colors:any = tokens(mode);
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
      margin: hp(2)
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
      color: colors.secondaryAccent[400]
    },
    devider: {
      width: wp('100%'),
      backgroundColor: colors.background[400],
    },
    icon: {
      width: hp(6.5),
      height: hp(6.5),
      borderRadius: hp(2),
      backgroundColor: colors.background[300],
      justifyContent: 'center',
      alignItems: 'center',

    },

  });
  return (
    <View style={styles.container}>

      <View style={styles.rectangle}>
        <Text style={styles.welcome}>Bienvenu, {data?.firstName} </Text>
        <Text style={styles.prompt}>Votre solde disponible </Text>
        <Text style={styles.solde} >{data?.compteBancaire.solde}DT</Text>
        <Divider style={styles.devider} />

        <View style={styles.miniContainer}>
          <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' }}>Numero de carte</Text>
          <Text style={{ color: colors.secondary[100], fontWeight: 'bold' }}>{data?.compteBancaire.carte.numero_carte}</Text>
        </View>

        <Divider style={styles.devider} />

        <View style={styles.miniContainer}>

          <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' }}>Solde de compte</Text>
          <Text style={{ color:colors.secondary[100], fontWeight: 'bold' }}>{data?.compteBancaire.solde}DT</Text>

        </View>

      </View>


    <ScrollView>
      <View style={styles.midContainer}>

        <TouchableOpacity onPressIn={() => navigation.navigate('Transactions')}
        accessibilityRole='button'
        accessibilityLabel='Historique de mouvements'
        accessibilityHint='Appuyer pour naviguer vers la page de votre historique de mouvements'

        >

          <View style={styles.btnContainer} >

            <View style={styles.icon}>
              <Icon source="history" size={hp(5)} color={colors.accent[300]} />
            </View>

            <Text style={{ color: colors.main.fontColor, fontWeight: 'bold', marginEnd: wp(3) }}>Historique Mouvements</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity onPressIn={() => navigation.navigate('Card')}
        accessibilityRole='button'
        accessibilityLabel='Votre Carte Webank'
        accessibilityHint='Appuyer pour naviguer vers la page qui vous permet de gerer votre carte webank'
        >

          <View style={styles.btnContainer} >

            <View style={styles.icon}>
              <Icon source="card-text" size={hp(5)} color={colors.accent[300]} />
            </View>

            <Text style={{ color: colors.main.fontColor, fontWeight: 'bold', marginEnd: wp(3) }}>Votre Carte</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity onPressIn={() => navigation.navigate('Transactions')}
        accessibilityRole='button'
        accessibilityLabel='Effectuer un virement'
        accessibilityHint='Appuyer pour naviguer vers la page qui vous permet d effectuer un virement'
        >

          <View style={styles.btnContainer} >

            <View style={styles.icon}>
              <Icon source="bank-transfer" size={hp(5)} color={colors.accent[300]} />
            </View>

            <Text style={{ color: colors.main.fontColor, fontWeight: 'bold', marginEnd: wp(3) }}>Effectuer un virement</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity onPressIn={() => navigation.navigate('Transactions')}
        accessibilityRole='button'
        accessibilityLabel='Historique Virements'
        accessibilityHint='Appuyer pour naviguer vers la page de votre historique de virements'
        >

          <View style={styles.btnContainer} >

            <View style={styles.icon}>
              <Icon source="transfer-down" size={hp(5)} color={colors.accent[300]} />
            </View>

            <Text style={{ color: colors.main.fontColor, fontWeight: 'bold', marginEnd: wp(3) }}>Historique Virements</Text>

          </View>

        </TouchableOpacity>
        <TouchableOpacity onPressIn={() => navigation.navigate('Transactions')}
                accessibilityRole='button'
                accessibilityLabel='Reclamation'
                accessibilityHint='Appuyer pour naviguer vers la page qui vous permet de effetuer une reclamation'
                >

                  <View style={styles.btnContainer} >

                    <View style={styles.icon}>
                      <Icon source="alert-box-outline" size={hp(5)} color={colors.accent[300]} />
                    </View>

                    <Text style={{ color: colors.main.fontColor, fontWeight: 'bold', marginEnd: wp(3) }}>Reclamation</Text>

                  </View>

                </TouchableOpacity>
        <TouchableOpacity onPressIn={() => navigation.navigate('Settings')}>
          <View style={styles.btnContainer} >
            <View style={styles.icon}>
            <Icon source="cog" size={hp(5)} color={colors.accent[300]} />
            </View>
            <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' , marginEnd:wp(3)}}>Parametres</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>

    </View>
  );
};

export default Home;


