import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Divider,  Icon } from 'react-native-paper';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { tokens } from '../../assets/palette';

// storage
import * as Keychain from 'react-native-keychain';

// api manage (custom hook)
import getApi from '../../API/Interceptor';

// navigation
import { RootStackParamListSignedIn } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DarkTheme } from '@react-navigation/native';
import { useGetClientsQuery } from '../../API/ClientApi';

type HomeProps = NativeStackScreenProps<RootStackParamListSignedIn, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const { isLoggedIn, mode, user } = useSelector(
    (state: RootState) => state.global,
  );

  const colors: any = tokens(mode);
  const [clientDetails, setClientDetails] = useState<Object>({});
  let client = user?.clientId;
  const { data, isLoading, error } = useGetClientsQuery(client);
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
      justifyContent: 'space-between',
    },
    midContainer: {
      width: wp(100),
      padding: hp(3),

      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    btnContainer: {
      margin: wp(1),
      padding: wp(2),
      flexDirection: 'row',
      // justifyContent: 'space-between',
      gap: wp(7),
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
      margin: hp(2),
    },
    prompt: {
      fontSize: hp('2.5%'),
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: hp('6%'),
      color: colors.main.fontColor,
    },
    solde: {
      fontSize: wp(14),
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.accent[300],
    },
    devider: {
      width: wp('100%'),
      height: hp(0.2),
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
    notifBg: {
      position: 'absolute',
      left: wp(3),
      top: hp(1.5),
      backgroundColor: colors.background[300],
      borderRadius: wp(6),
      width: wp(12),
      height: wp(12),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOffset: {
        width: wp(2),
        height: hp(2),
      },
      shadowRadius: 5,
      elevation: 5,
    },
    notifBadge: {
      position: 'absolute',
      right: -wp(2),
      top: hp(4.5),
      backgroundColor: colors.main.danger,
      borderRadius: wp(3),
      width: wp(6),
      height: wp(6),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.welcome}>Bienvenu, {data?.firstName} </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={styles.notifBg}
          accessibilityRole="button"
          accessibilityLabel='Notifications'
        >

          <Icon source="bell" size={wp(9)} color={colors.accent[300]} />
          {/* {unreadCount > 0 && (
                <View style={styles.notifBadge}>
                  <Text style={{ color: 'white', fontWeight:'bold'}}>2</Text>
                </View>
            )} 
           */}
        </TouchableOpacity>
        <Text style={styles.prompt}>Votre solde disponible </Text>
        <Text style={styles.solde}>{data?.compteBancaire.solde}DT</Text>
        <Divider style={styles.devider} />

        {/* <View style={styles.miniContainer}>
          <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' }}>Numéro de carte</Text>
          <Text style={{ color: colors.secondary[100], fontWeight: 'bold' }}>{data?.compteBancaire.carte.numero_carte}</Text>
        </View>

        <Divider style={styles.devider} /> */}

        <View style={styles.miniContainer}>

          <Text style={{ color: colors.main.fontColor, fontWeight: 'bold' }}>Solde de compte</Text>
          <Text style={{ color: colors.secondary[600], fontWeight: 'bold' }}>{data?.compteBancaire.solde}DT</Text>

        </View>
      </View>

      <ScrollView>
        <View style={styles.midContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Operations')}
            accessibilityRole="button"
            accessibilityLabel="Historique de mouvements"
            accessibilityHint="Appuyer pour naviguer vers la page de votre historique de mouvements">
            <View style={styles.btnContainer}>
              <View style={styles.icon}>
                <Icon
                  source="history"
                  size={hp(5)}
                  color={colors.accent[300]}
                />
              </View>

              <Text
                style={{
                  color: colors.main.fontColor,
                  fontSize: wp(4),
                  fontWeight: 'bold',
                  marginEnd: wp(3),
                }}>
                Historique Mouvements
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Card')}
            accessibilityRole="button"
            accessibilityLabel="Votre Carte Webank"
            accessibilityHint="Appuyer pour naviguer vers la page qui vous permet de gérer votre carte webank">
            <View style={styles.btnContainer}>
              <View style={styles.icon}>
                <Icon
                  source="card-text"
                  size={hp(5)}
                  color={colors.accent[300]}
                />
              </View>

              <Text
                style={{
                  color: colors.main.fontColor,
                  fontSize: wp(4),
                  fontWeight: 'bold',
                  marginEnd: wp(3),
                }}>
                Votre Carte
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Beneficiaire')}
            accessibilityRole="button"
            accessibilityLabel="Bénéficiaire"
            accessibilityHint="Appuyer pour naviguer vers la page qui vous permet de gérer vos bénéficiaires">
            <View style={styles.btnContainer}>
              <View style={styles.icon}>
                <Icon
                  source="account-convert"
                  size={hp(5)}
                  color={colors.accent[300]}
                />
              </View>

              <Text
                style={{
                  color: colors.main.fontColor,
                  fontSize: wp(4),
                  fontWeight: 'bold',
                  marginEnd: wp(3),
                }}>
                Bénéficiaires
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Transfer')}
            accessibilityRole="button"
            accessibilityLabel="Effectuer un virement"
            accessibilityHint="Appuyer pour naviguer vers la page qui vous permet d'effectuer un virement">
            <View style={styles.btnContainer}>
              <View style={styles.icon}>
                <Icon
                  source="bank-transfer"
                  size={hp(5)}
                  color={colors.accent[300]}
                />
              </View>

              <Text
                style={{
                  color: colors.main.fontColor,
                  fontSize: wp(4),
                  fontWeight: 'bold',
                  marginEnd: wp(3),
                }}>
                Effectuer un virement
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Transfers')}
            accessibilityRole="button"
            accessibilityLabel="Historique Virements"
            accessibilityHint="Appuyer pour naviguer vers la page de votre historique de virements">
            <View style={styles.btnContainer}>
              <View style={styles.icon}>
                <Icon
                  source="transfer-down"
                  size={hp(5)}
                  color={colors.accent[300]}
                />
              </View>

              <Text
                style={{
                  color: colors.main.fontColor,
                  fontSize: wp(4),
                  fontWeight: 'bold',
                  marginEnd: wp(3),
                }}>
                Historique Virements
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Reclamation')}
            accessibilityRole="button"
            accessibilityLabel="Réclamation"
            accessibilityHint="Appuyer pour naviguer vers la page qui vous permet de effectuer une réclamation">
            <View style={styles.btnContainer}>
              <View style={styles.icon}>
                <Icon
                  source="alert-box-outline"
                  size={hp(5)}
                  color={colors.accent[300]}
                />
              </View>

              <Text
                style={{
                  color: colors.main.fontColor,
                  fontSize: wp(4),
                  fontWeight: 'bold',
                  marginEnd: wp(3),
                }}>
                Réclamation
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <View style={styles.btnContainer}>
              <View style={styles.icon}>
                <Icon source="cog" size={hp(5)} color={colors.accent[300]} />
              </View>
              <Text
                style={{
                  color: colors.main.fontColor,
                  fontSize: wp(4),
                  fontWeight: 'bold',
                  marginEnd: wp(3),
                }}>
                Paramètres
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
