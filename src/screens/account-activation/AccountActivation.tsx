import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {setMode} from '../../context/globalReducer';

import {tokens} from '../../assets/palette';

// redux

const AccountActivation = () => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const route = useRoute();
  const {activationToken} = route.params as {activationToken?: string};


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: mode === "dark" ? "white" : "black",
    },
  });

  return (
    <View style={styles.container}>
      <Icon name="account-heart" size={150} color={colors.main.buttonColor} />
      <Text style={styles.text}>Votre compte a été activé ✅</Text>
    </View>
  );
};

export default AccountActivation;
