import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DataTable} from 'react-native-paper';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {useGetClientsQuery} from '../../API/ClientApi';
import {tokens} from '../../assets/palette';

const numberOfItemsPerPageList = [2, 3, 4];

const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];



const Transactions = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

    useEffect(() => {
     setPage(0);
  }, [numberOfItemsPerPage]);

  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const {data, isLoading} = useGetClientsQuery(1);
  console.log("🚀 ~ Transactions ~ data transaction:", data?.compteBancaire.transactions)

  const transaction = data?.compteBancaire.transactions;

  if (isLoading) return <Text>Loading...</Text>;

  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,
    },
  });

  return (
    <View style={styles.container}>
      <Text>For testing purposes</Text>
      
      <DataTable>
      
        <DataTable.Header>
          <DataTable.Title sortDirection="descending">
            Date Operation
          </DataTable.Title>
          <DataTable.Title>Libelle</DataTable.Title>
          <DataTable.Title>Date Valeur</DataTable.Title>
          <DataTable.Title>Debit</DataTable.Title>
          <DataTable.Title sortDirection="descending">Credit</DataTable.Title>
        </DataTable.Header>

        {transaction?.slice(from, to).map((item) => (
        <DataTable.Row key={item.tran_id}>
          <DataTable.Cell>{item.date_operation}</DataTable.Cell>
          <DataTable.Cell numeric>{item.tran_emplacement}</DataTable.Cell>
          <DataTable.Cell numeric>{item.date_valeur}</DataTable.Cell>
          <DataTable.Cell numeric>{item.tran_id}</DataTable.Cell>
          <DataTable.Cell numeric>{item.montant}</DataTable.Cell>
        </DataTable.Row>
      ))}

        <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={'Rows per page'}
      />
      </DataTable>
    </View>
  );
};

export default Transactions;

