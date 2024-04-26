import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import { useGetVirementByIdQuery } from '../../API/ClientApi';
import axios from 'axios';
import {API_BASE_URL} from '@env';


// redux
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {tokens} from '../../assets/palette';
//responsive screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const VerifiedTransfer = () => {
  const route = useRoute();
  const {virId} = route.params as {virId?: string};
  console.log('🚀 ~ VerifiedTransfer ~ virId:', virId);
  const {mode} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor
    },
    title:{
      color: colors.main.passText,
      fontWeight: 'bold',
      fontSize: wp(5),
    },
    text: {
      fontSize: wp(4),
      color: colors.main.fontColor,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    miniContainer: {
      
      borderRadius: wp(4),
      backgroundColor: colors.background[400],
      padding: wp(12),
    }
  });
  
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/operation/virement/${virId}`,
      );
      console.log('VerifiedTransfer', response.data);
      setData(response.data);
    } catch (error: any) {
      console.error('VerifiedTransfer', error.response || error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virement vérifié</Text>
      <Text style={styles.title}>Détails du virement</Text>
      <Text style={styles.title}>Virement à </Text>
      <Text style={[styles.text,{fontWeight:'bold'}]}>{(data as any)?.beneficiaire?.nom}</Text>
       <View style={styles.miniContainer}>
        <View style={styles.item}>
          <Text style={styles.title}>Date du virement:</Text>
          <Text style={styles.text}>{(data as any)?.date_operation}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Montant:</Text>
          <Text style={styles.text}>{(data as any)?.montant}DT</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>Motif:</Text>
          <Text style={styles.text}>{(data as any)?.motif}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>État du virement:</Text>
          <Text style={styles.text}>{(data as any)?.etat}</Text>
        </View>
      </View>
    </View>
  );
};


export default VerifiedTransfer;