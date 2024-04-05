import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { tokens } from '../../assets/palette';

// settings screen
import SettingsList from './SettingsList';

const Settings = () => {
  const { isLoggedIn, mode, user } = useSelector(
    (state: RootState) => state.global,
  );
  const colors:any = tokens(mode);
  
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,
    },
  });
  

  return (
    <View style={styles.container}>
      <SettingsList />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})