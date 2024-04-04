// import React, {useEffect} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {DataTable} from 'react-native-paper';

// // redux
// import {useSelector} from 'react-redux';
// import {RootState} from '../../context/store';
// import {useGetClientsQuery} from '../../API/ClientApi';
// import {tokens} from '../../assets/palette';

// const numberOfItemsPerPageList = [2, 3, 4];

// const items = [
//   {
//     key: 1,
//     name: 'Page 1',
//   },
//   {
//     key: 2,
//     name: 'Page 2',
//   },
//   {
//     key: 3,
//     name: 'Page 3',
//   },
// ];



// const Transactions = () => {
//   const [page, setPage] = React.useState(0);
//   const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
//   const from = page * numberOfItemsPerPage;
//   const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

//     useEffect(() => {
//      setPage(0);
//   }, [numberOfItemsPerPage]);

//   const {mode} = useSelector((state: RootState) => state.global);
//   const colors = tokens(mode);

//   const {data, isLoading} = useGetClientsQuery(1);
//   console.log("🚀 ~ Transactions ~ data transaction:", data?.compteBancaire.transactions)

//   const transaction = data?.compteBancaire.transactions;

//   if (isLoading) return <Text>Loading...</Text>;

  

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       backgroundColor: colors.main.backgroundColor,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <Text>For testing purposes</Text>
      
//       <DataTable>
      
//         <DataTable.Header>
//           <DataTable.Title sortDirection="descending">
//             Date Operation
//           </DataTable.Title>
//           <DataTable.Title>Libelle</DataTable.Title>
//           <DataTable.Title>Date Valeur</DataTable.Title>
//           <DataTable.Title>Debit</DataTable.Title>
//           <DataTable.Title sortDirection="descending">Credit</DataTable.Title>
//         </DataTable.Header>

//         {transaction?.slice(from, to).map((item) => (
//         <DataTable.Row key={item.tran_id}>
//           <DataTable.Cell>{item.date_operation}</DataTable.Cell>
//           <DataTable.Cell numeric>{item.tran_emplacement}</DataTable.Cell>
//           <DataTable.Cell numeric>{item.date_valeur}</DataTable.Cell>
//           <DataTable.Cell numeric>{item.tran_id}</DataTable.Cell>
//           <DataTable.Cell numeric>{item.montant}</DataTable.Cell>
//         </DataTable.Row>
//       ))}

//         <DataTable.Pagination
//         page={page}
//         numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
//         onPageChange={page => setPage(page)}
//         label={`${from + 1}-${to} of ${items.length}`}
//         showFastPaginationControls
//         numberOfItemsPerPageList={numberOfItemsPerPageList}
//         numberOfItemsPerPage={numberOfItemsPerPage}
//         onItemsPerPageChange={onItemsPerPageChange}
//         selectPageDropdownLabel={'Rows per page'}
//       />
//       </DataTable>
//     </View>
//   );
// };

// export default Transactions;
import React, { useEffect, useState } from 'react'; // Import the missing useState hook
import {StyleSheet, Text, View, FlatList, Button, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {useGetClientsQuery} from '../../API/ClientApi';
import {tokens} from '../../assets/palette';
import { Icon } from 'react-native-paper';


const Transactions = () => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const {data, isLoading} = useGetClientsQuery(1);
  const transaction = data?.compteBancaire.transactions;


 


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,
    },
    item: {
      width: wp(90),
      flex:1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: wp(4),
      padding: wp(3),
      backgroundColor: colors.main.rectangleColor,
      margin: wp(1)
    },
    icon: {
      
      width: hp(8),
      height: hp(8),
      margin: wp(2),
      borderRadius: hp(2),
      backgroundColor: mode === 'dark' ? colors.background[300] : colors.background[300],
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
    text:{
      fontSize: wp(4),
      marginBottom: wp(2),
      color: colors.main.fontColor,
    }
  });
  
  const renderItem = ({item}: {item: any}) => (
    <TouchableWithoutFeedback
      accessibilityLabel={`operation ${item.tran_id}, operation ${item.tran_canal.replace(/_/g, ' ')}, operation effectuee a ${item.tran_marchant}, ${item.tran_emplacement}, la date de l'operation est ${item.date_operation}, son montant est de ${item.tran_type === 'Credit' ? '' : '-'}${item.montant} dinars`}
      onPress={() => {
        // Handle item click
      }}
    >
      <View style={styles.item} accessibilityHint={`operation ${item.tran_id}`}>
      {/* <View style={styles.icon} accessibilityLabel='icone'>
        <Icon source={item.tran_type === 'Credit' ? 'download-outline' : 'upload-outline'} size={hp(5)} color={item.tran_type === 'Credit' ? colors.main.passText : colors.main.dangerText}  />

      </View> */}
      
      <View style={styles.left}>
        <Text style={styles.libelle} accessibilityRole='text' accessibilityLabel={`operation ${item.tran_canal.replace(/_/g, ' ')}`}>{item.tran_canal.replace(/_/g, ' ')}</Text>
        <Text style={styles.text} accessibilityRole='text' accessibilityLabel={`operation effectuee a ${item.tran_marchant}`}>{item.tran_marchant}</Text>
        <Text style={styles.text} accessibilityRole='text' accessibilityLabel={`emplacement de l'operation est ${item.tran_emplacement}`}>{item.tran_emplacement}</Text>
      </View>
      
      <Text style={[styles.text,{width:wp(12)}]} accessibilityRole='text' accessibilityLabel={`la date de l'operation est ${item.date_operation}`}>{item.date_operation}</Text>
      <View style={styles.icon}>
        <Text style={item.tran_type === 'Credit' ? styles.montant : styles.montantCredit} accessibilityRole='text' accessibilityLabel={`le montant de l'operation est ${item.tran_type === 'Credit' ? '' : '-'}${item.montant} dinars`} >
          {item.tran_type === 'Credit' ? '' : '-'}{item.montant}DT
        </Text>
      </View>
      
    </View>
    </TouchableWithoutFeedback>

  );



  

  return (

    <View style={styles.container}>
      <Text style={[styles.libelle, { textAlign: 'left', fontSize: wp(6), marginBottom:wp(3)}]}>Historique de Mouvements</Text>
      

      
      <FlatList
        data={transaction}
        renderItem={renderItem}
        keyExtractor={item => item.tran_id.toString()}
        // accessibilityRole='list'
        // accessibilityLabel='historiques de vos mouvements'
      />
    </View>
  );
};

export default Transactions;
