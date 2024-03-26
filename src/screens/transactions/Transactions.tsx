import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { DataTable } from 'react-native-paper'

// redux
import { useSelector } from 'react-redux';
import {RootState} from '../../context/store';
import { tokens } from '../../assets/palette';

const Transactions = () => {

  const { mode } = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

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
    </View>
  )
}

export default Transactions

const styles = StyleSheet.create({})