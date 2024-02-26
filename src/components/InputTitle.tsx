import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';

import { tokens } from '../assets/palette';


type InputTitleProps = {
  title: string;
};

const InputTitle = (props: InputTitleProps) => {

  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const styles = StyleSheet.create({
    container: {
      margin: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: mode === 'dark' ? 'white' : 'black',
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>

  );
};

export default InputTitle;

