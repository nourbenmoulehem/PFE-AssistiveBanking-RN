import {
  StyleSheet,
  Text,
  View,
  Modal,
  Switch,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';
import * as Progress from 'react-native-progress';

import {API_BASE_URL} from '@env';
// api manage (custom hook)
import getApi from '../../API/Interceptor';

// navigation
import {RootStackParamListSignedIn} from '../../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DarkTheme} from '@react-navigation/native';
import {useGetClientsQuery} from '../../API/ClientApi';

//component
import CreditCard from '../../components/CreditCard';
import axios from 'axios';

// ...

const Card = () => {
  const {mode, user} = useSelector((state: RootState) => state.global);
  const {data, isLoading, error} = useGetClientsQuery(user?.clientId);

  const [status, setStatus] = useState<'active' | 'inactive'>(
    data?.compteBancaire?.carte?.status,
  );
  const [serverFeedback, setServerFeedback] = useState<string>('');

  useEffect(() => {
  }, [status]);

  const colors = tokens(mode);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      margin: wp(3),
      padding: wp(1),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    spendings: {
      margin: wp(3),

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    last: {
      flex: 1,
      padding: wp(2),
      margin: wp(1),
      marginLeft: 0,
      borderRadius: hp(2),
      backgroundColor:
        mode === 'dark' ? colors.background[300] : colors.background[300],
      justifyContent: 'center',
      alignItems: 'center',
    },
    current: {
      flex: 1,
      padding: wp(2),
      margin: wp(1),
      marginRight: 0,
      borderRadius: hp(2),
      backgroundColor:
        mode === 'dark' ? colors.background[300] : colors.background[300],
      justifyContent: 'center',
      alignItems: 'center',
    },

    statusWarning: {
      width: wp(89),
      padding: wp(1.5),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.main.warning,
      borderRadius: wp(4),
    },
    statusDanger: {
      width: wp(89),
      padding: wp(1.5),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.main.danger,
      borderRadius: wp(4),
    },
    statusPass: {
      width: wp(89),
      padding: wp(1.5),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.main.pass,
      borderRadius: wp(4),
    },
    expDate: {
      width: wp(89),
      padding: wp(1.5),
      margin: wp(1.5),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.background[300],
      borderRadius: wp(4),
    },
    plafond: {
      width: wp(89),
      padding: wp(1.5),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.background[300],
      borderRadius: wp(5),
    },
    text: {
      fontWeight: 'bold',
      color: colors.main.fontColor,
    },
    statusTextD: {
      fontWeight: 'bold',
      color: colors.main.dangerText,
    },
    statusTextW: {
      fontWeight: 'bold',
      color: colors.main.warningText,
    },
    statusTextP: {
      // textAlign:'right',
      fontWeight: 'bold',
      color: colors.main.passText,
    },
  });
  interface StatusStyles {
    [key: string]: any;
  }
  const statusStyles: StatusStyles = {
    inactive: [styles.statusDanger, styles.statusTextD],
    active: [styles.statusPass, styles.statusTextP],
    'en cours de personnalisation': [styles.statusWarning, styles.statusTextW],
  };

  const updateStatus = async (status: string) => {
    console.log('🚀 ~ updateStatus ~ status:', status);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/carte/status/${user?.clientId}`,
        {
          status,
        },
      );

      if (response.status === 200) {
        console.log('status updated successfully');
        setServerFeedback(
          'Le statut de votre carte a été mis à jour avec succès',
        );
        console.log('====================================');
        console.log(data?.compteBancaire?.carte?.status);
        console.log('====================================');
      }
    } catch (error) {
      console.log(error);
      setServerFeedback(
        "Une erreur s'est produite lors de la mise à jour du statut de votre carte",
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.miniContainer}>
        {data &&
          data.firstName &&
          data.lastName &&
          data.compteBancaire.carte.numero_carte &&
          data.compteBancaire.carte.date_expiration && (
            <CreditCard
              name={data.firstName}
              lastName={data.lastName}
              cardNumber={data.compteBancaire.carte.numero_carte}
              expirationDate={data.compteBancaire.carte.date_expiration}
            />
          )}
      </View>

      <View style={styles.midContainer}>
        <View
          style={
            data &&
            data.compteBancaire &&
            data.compteBancaire.carte &&
            statusStyles[status][0]
          }>
          <Text
            accessibilityRole="header"
            style={
              data?.compteBancaire?.carte &&
              statusStyles[status][1]
            }>
            Statut Carte
          </Text>
          <Text
            accessibilityRole="text"
            accessibilityLabel={`Votre carte est ${data?.compteBancaire?.carte?.status}`}
            style={
              data?.compteBancaire?.carte &&
              statusStyles[status][1]
            }>
            {data?.compteBancaire?.carte?.status}
          </Text>
        </View>
        <View style={styles.expDate}>
          <Text accessibilityRole="header" style={styles.text}>
            Date d'expiration
          </Text>
          <Text
            accessibilityRole="text"
            accessibilityLabel={`la date d'expiration de votre carte est le ${data?.compteBancaire?.carte?.date_expiration}`}
            style={styles.text}>
            {data?.compteBancaire?.carte?.date_expiration}
          </Text>
        </View>
        <View style={styles.plafond}>
          <Text style={styles.text}>Plafond</Text>

          <Text
            accessibilityRole="text"
            accessibilityLabel={`le Plafond de votre carte est ${data?.compteBancaire?.carte?.plafond} dinars`}
            style={styles.text}>
            {data?.compteBancaire?.carte?.plafond}DT
          </Text>
        </View>

        <View style={styles.spendings}>
          <View style={styles.last}>
            <Progress.Circle
              accessibilityLabel={`vos dépenses totales de mois derniers sont ${20} dinars`}
              size={wp(30)}
              progress={0.02} // to be changed to real value which is (the total spendings during the previous months starting the last one)/plafond
              thickness={wp(3)}
              showsText={true}
              strokeCap="round"
              color={colors.main.old}
              allowFontScaling={true}
              unfilledColor={colors.main.gaugeBG}
              borderWidth={0}
              textStyle={{fontWeight: 'bold'}}
              formatText={progress => `${20} DT`} //to be changed later to the real total spendings during the previous month
            />
            <Text style={[styles.text, {textAlign: 'center', margin: wp(2)}]}>
              Dépenses totales de mois dernier
            </Text>
          </View>
          <View style={styles.current}>
            <Progress.Circle
              accessibilityLabel={`vos dépenses totales de mois courant sont ${30} dinars`}
              size={wp(30)}
              progress={0.05} // to be changed to real value which is (the total spendings of all time)/plafond
              thickness={wp(3)}
              showsText={true}
              strokeCap="round"
              color={colors.main.new}
              allowFontScaling={true}
              unfilledColor={colors.main.gaugeBG}
              borderWidth={0}
              textStyle={{fontWeight: 'bold'}}
              formatText={progress => `${30} DT`} //to be changed later to the real total spendings during the current month
            />
            <Text style={[styles.text, {textAlign: 'center', margin: wp(2)}]}>
              Dépenses totales de ce mois
            </Text>
          </View>
        </View>

        <View
          style={{
            width: wp(89),
            padding: wp(3),
            paddingLeft: wp(1),
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            accessibilityRole="text"
            accessibilityLabel={
              data?.compteBancaire?.carte?.status === 'inactive'
                ? 'Activer carte'
                : 'Désactiver carte'
            }
            style={styles.text}>
            {data?.compteBancaire?.carte?.status === 'inactive'
              ? 'Activer carte'
              : 'Désactiver carte'}
          </Text>
          {data?.compteBancaire?.carte?.status !==
            'encours de personnalisation' && (
            <Switch
              style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
              accessibilityRole="switch"
              accessibilityLabel={
                data?.compteBancaire?.carte?.status === 'active'
                  ? 'Carte activée'
                  : 'Carte désactivée'
              }
              trackColor={{false: 'gray', true: colors.secondary[400]}}
              thumbColor={
                data?.compteBancaire?.carte?.status === 'active'
                  ? colors.secondary[500]
                  : 'gray'
              }
              value={status === 'active'}
              onValueChange={value => {
                setModalVisible(true);
              }}
            />
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text
                  accessibilityRole="text"
                  accessibilityLabel="changer le statut?">
                  Êtes-vous sûr de vouloir changer le statut?
                </Text>
                <TouchableOpacity
                  accessibilityLabel="Oui"
                  style={{
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: colors.main.pass,
                  }}
                  onPress={() => {
                    const newStatus = status == 'active' ? 'inactive' : 'active';
                    setStatus(newStatus);
                    updateStatus(newStatus);
                    setModalVisible(false);
                  }}>
                  <Text>Oui</Text>
                </TouchableOpacity>
                {serverFeedback && (
                  <Text style={styles.statusWarning}>{serverFeedback}</Text>
                )}
                <TouchableOpacity
                  accessibilityLabel="Annuler"
                  onPress={() => setModalVisible(false)}>
                  <Text>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default Card;
