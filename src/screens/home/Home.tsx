import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {RootState} from '../../context/store';
import { setLogout } from '../../context/globalReducer'

// storage
import * as Keychain from 'react-native-keychain';

const Home = () => {
  const dispatch = useDispatch();
  const {isLoggedIn, mode, user} = useSelector((state: RootState) => state.global);
  console.log("🚀 ~ Home ~ isLoggedIn:", isLoggedIn)
  const handleLogout = async () => {
    await Keychain.resetGenericPassword();
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          console.log('log out')
          handleLogout()
          dispatch(setLogout())
        }}
        style={{padding: 20, backgroundColor: 'red', margin: 20}}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})