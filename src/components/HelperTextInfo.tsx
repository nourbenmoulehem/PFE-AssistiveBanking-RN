import { StyleSheet, Text, View } from 'react-native'
import { HelperText } from 'react-native-paper'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';


type HelperTextInfoProps = {
  info: string
}

const HelperTextInfo = (props : HelperTextInfoProps) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);
  const styles = StyleSheet.create({
    helperText: {
      fontSize: wp(4.5), 
      fontWeight: 'bold',
      color: colors.accent[400], 
      textAlign: 'center',
      // padding: 10, 
    },
  });
  return (
    <View>
      <HelperText type="info" style={styles.helperText}>
      {props.info}
    </HelperText>
    </View>
  )
}



export default HelperTextInfo
