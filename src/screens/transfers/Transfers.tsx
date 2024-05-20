import React, {useEffect, useState} from 'react'; // Import the missing useState hook
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {TextInput, TouchableRipple, Icon} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {useGetTransfersQuery} from '../../API/ClientApi';
import {tokens} from '../../assets/palette';
import axios from 'axios';

// components
import FilterByDate from '../../components/FilterByDate';

const Transfers = () => {
  const {mode, user} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);

  const {data, isLoading, error} = useGetTransfersQuery(user?.clientId);
  const [transfers, setTransfers] = useState<string | any[]>([]);
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    if (data) {
      setTransfers(data);
    }
  }, [data, resetFlag]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,
    },
    item: {
      width: wp(90),
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: wp(4),
      padding: wp(3),
      backgroundColor: colors.main.rectangleColor,
      margin: wp(1),
    },
    icon: {
      width: hp(8),
      height: hp(8),
      margin: wp(2),
      borderRadius: hp(2),
      backgroundColor:
        mode === 'dark' ? colors.background[300] : colors.background[300],
      justifyContent: 'center',
      alignItems: 'center',
    },
    left: {
      //flexWrap: 'wrap',
      flexDirection: 'column',
    },
    libelle: {
      marginBottom: wp(2),
      fontSize: wp(4),
      color: colors.main.fontColor,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    montant: {
      fontWeight: 'bold',
      color: colors.main.passText,
    },
    montantCredit: {
      fontWeight: 'bold',
      color: colors.main.dangerText,
    },
    text: {
      fontSize: wp(4),
      marginBottom: wp(2),
      color: colors.main.fontColor,
    },
    reset: {
      width: wp(90),
      height: hp(7),
      backgroundColor: colors.main.backgroundColor,
      borderRadius: wp(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (transfers === "Aucun virement trouvé") {
    console.log('====================================');
    console.log('transfers', transfers);
    console.log('====================================');
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.libelle,
            {textAlign: 'left', fontSize: wp(6), marginBottom: wp(3)},
          ]}>
          Historique de virements
        </Text>
        <View style={styles.reset}>
          <TouchableRipple onPress={() => reset}>
            <Icon source="autorenew" size={hp(5)} color="#A45704" />
          </TouchableRipple>
          <Text style={[styles.libelle, {fontSize: wp(4)}]}>
            Aucun virement trouvé
          </Text>
        </View>
      </View>
    );
  }

  const renderItem = ({item}: {item: any}) => (
    <TouchableWithoutFeedback
      accessibilityLabel={`virement ${item.vir_id}, son montant est de ${item.montant} dinars`}
      onPress={() => {
        // Handle item click
      }}>
      <View style={styles.item} accessibilityHint={`virement ${item.vir_id}`}>
        <View style={styles.left}>
          {/* <Text
            style={styles.libelle}
            accessibilityRole="text"
            accessibilityLabel={`virement ${item.op_canal.replace(
              /_/g,
              ' ',
            )}`}>
            {item.op_canal.replace(/_/g, ' ')}
          </Text> */}

          <Text
            style={styles.libelle}
            accessibilityRole="text"
            accessibilityLabel={`Motif de virement est ${item.motif}`}>
            Motif: {item.motif}
          </Text>
          <Text style={styles.libelle}>
            {' '}
            Beneficiare: {item.beneficiaire.nom}
          </Text>

          <Text style={styles.libelle}> Etat: {item.etat}</Text>
        </View>

        <Text
          style={[styles.text, {width: wp(12)}]}
          accessibilityRole="text"
          accessibilityLabel={`la date de virement est ${item.date_operation}`}>
          {item.date_operation}
        </Text>
        <View style={styles.icon}>
          <Text
            style={styles.montantCredit}
            accessibilityRole="text"
            accessibilityLabel={`le beneficiare est ${item.beneficiaire.nom}`}>
            {/* {item.op_type === 'Credit' ? '' : '-'} */}
            {item.montant}DT
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  const fetchData = async (
    startDate: string,
    endDate: string,
    clientId = user?.clientId,
  ) => {
    const data = await axios.get(
      `${process.env.API_BASE_URL}/api/v1/operation/virement/byDate?startDate=${startDate}&endDate=${endDate}&clientId=${clientId}`,
    );

    if (data.status === 200) {
      setTransfers(data.data);
    } else {
      console.log('error', data);
    }
  };

  const reset = async () => {
    setResetFlag(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.libelle,
          {textAlign: 'left', fontSize: wp(6), marginBottom: wp(3)},
        ]}>
        Historique de virements
      </Text>
      <FilterByDate onDatesSelected={fetchData} resetOperations={reset} />

      {isLoading ? (
        <Text>en cours...</Text>
      ) : (
        <FlatList
          data={transfers}
          renderItem={renderItem}
          keyExtractor={item => item.vir_id.toString()}
          // accessibilityRole='list'
          // accessibilityLabel='historiques de vos mouvements'
        />
      )}
    </View>
  );
};

export default Transfers;
