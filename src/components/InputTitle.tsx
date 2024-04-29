import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';

import { tokens } from '../assets/palette';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


type InputTitleProps = {
  title: string;
};

const InputTitle = (props: InputTitleProps) => {

  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);

  const styles = StyleSheet.create({
    container: {
      // margin: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: wp(5) ,
      fontWeight: 'bold',
      color: colors.main.fontColor,
      //marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>

  );
};

export default InputTitle;

