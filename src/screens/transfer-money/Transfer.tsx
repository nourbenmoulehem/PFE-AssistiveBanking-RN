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

const Transfer = () => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,
    },
    libelle: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'left', 
      fontSize: wp(6), 
      marginBottom: wp(3)
    },
    
  });


  

  return (
    <View style={styles.container}>
      <Text
        style={styles.libelle}>
        Effectuer un virement
      </Text>
      
      
    </View>
  );
};

export default Transfer;
