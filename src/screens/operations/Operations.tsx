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
import {
  useGetOperationsQuery,
  useGetOperationsBetweenDatesQuery,
} from '../../API/ClientApi';
import {tokens} from '../../assets/palette';
import axios from 'axios';

// components
import FilterByDate from '../../components/FilterByDate';

const Operations = () => {
  const {mode, user} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);

  const {data, isLoading, error} = useGetOperationsQuery(user?.clientId);
  const [operations, setOperations] = useState<string | any[]>([]);
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    if (data) {
      console.log(data);
      console.log(operations.length);
      
      
      setOperations(data);
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
      marginVertical: wp(2),
      fontSize: wp(4.75),
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

  if (operations === "Aucune opération trouvée") {
    return (
      <View style={styles.container}>
       <Text
          style={
            {alignSelf:'flex-start',textAlign: 'left', fontSize: wp(7),fontWeight:'bold', margin: wp(5.5), color: colors.main.fontColor}
          }>
          Historique de Mouvements
        </Text>
        
        <View style={styles.reset}>
          <TouchableRipple onPress={() => reset()}>
            <Icon source="autorenew" size={hp(5)} color="#A45704" />
          </TouchableRipple>
          <Text style={[styles.libelle, {fontSize: wp(4)}]}>
            Aucun mouvement disponible
          </Text>
        </View>
      </View>
    );
  }

  

  const renderItem = ({item}: {item: any}) => (
    
    <TouchableWithoutFeedback
      accessibilityLabel={`opération ${
        item.op_id
      }, opération ${item.op_canal.replace(/_/g, ' ')}, opération effectuee a ${
        item.op_marchant
      }, ${item.op_emplacement}, la date de l'opération est ${
        item.date_operation
      }, son montant est de ${item.op_type === 'Credit' ? '' : '-'}${
        item.montant
      } dinars`}
      onPress={() => {
        // Handle item click
      }}>
      <View style={styles.item} accessibilityHint={`opération ${item.op_id}`}>
        {/* <View style={styles.icon} accessibilityLabel='icone'>
          <Icon source={item.op_type === 'Credit' ? 'download-outline' : 'upload-outline'} size={hp(5)} color={item.op_type === 'Credit' ? colors.main.passText : colors.main.dangerText}  />

        </View> */}

        <View style={styles.left}>
          <Text
            style={styles.libelle}
            accessibilityRole="text"
            accessibilityLabel={`opération ${item.op_canal.replace(
              /_/g,
              ' ',
            )}`}>
            {item.op_canal.replace(/_/g, ' ')}
          </Text>
          <Text
            style={styles.text}
            accessibilityRole="text"
            accessibilityLabel={`opération effectuee a ${item.op_marchant}`}>
            {item.op_marchant}
          </Text>
          <Text
            style={styles.text}
            accessibilityRole="text"
            accessibilityLabel={`emplacement de l'opération est ${item.op_emplacement}`}>
            {item.op_emplacement}
          </Text>
        </View>

        <Text
          style={[styles.text, {width: wp(12)}]}
          accessibilityRole="text"
          accessibilityLabel={`la date de l'opération est ${item.date_operation}`}>
          {item.date_operation}
        </Text>
        <View style={styles.icon}>
          <Text
            style={
              item.op_type === 'Credit' ? styles.montant : styles.montantCredit
            }
            accessibilityRole="text"
            accessibilityLabel={`le montant de l'opération est ${
              item.op_type === 'Credit' ? '' : '-'
            }${item.montant} dinars`}>
            {item.op_type === 'Credit' ? '' : '-'}
            {item.montant}DT
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );


//   const renderItem = ({item}: {item: any}) => {
//     console.log(item);
    
//     return (
//     <Text>Hello</Text>
//     )
// };

  const fetchData = async (
    startDate: string,
    endDate: string,
    clientId = 1,
  ) => {
    const data = await axios.get(
      `${process.env.API_BASE_URL}/api/v1/operation/mouvement/byDate?startDate=${startDate}&endDate=${endDate}&clientId=${clientId}`,
    );

    if (data.status === 200) {
      setOperations(data.data);
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
          style={
            {alignSelf:'flex-start',textAlign: 'left', fontSize: wp(7),fontWeight:'bold', margin: wp(5.5), color: colors.main.fontColor}
          }>
          Historique de Mouvements
        </Text>
        
      <FilterByDate onDatesSelected={fetchData} resetOperations={reset} />

      {isLoading ? (
        <Text>en cours...</Text>
      ) : (
        <FlatList
          data={operations}
          renderItem={renderItem}
          keyExtractor={item => item.op_id}
          accessibilityRole='list'
          accessibilityLabel='historiques de vos mouvements'
        />
      )}
    </View>
  );
};

export default Operations;
