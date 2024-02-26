import { StyleSheet, Text, View } from 'react-native'
import { HelperText } from 'react-native-paper'
import React from 'react'

type HelperTextErrorProps = {
  error: string;
  visible: boolean | undefined;
}

const HelperTextError = (props : HelperTextErrorProps) => {
  const styles = StyleSheet.create({
    helperText: {
      fontSize: 18, 
      color: 'green', 
      padding: 10, 
    },
  });
  return (
    <View>
      <HelperText type="error" visible={props.visible}>
      {props.error} 
    </HelperText>
    </View>
  )
}

export default HelperTextError

