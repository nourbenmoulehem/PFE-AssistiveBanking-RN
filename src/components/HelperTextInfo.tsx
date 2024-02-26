import { StyleSheet, Text, View } from 'react-native'
import { HelperText } from 'react-native-paper'
import React from 'react'

type HelperTextInfoProps = {
  info: string
}

const HelperTextInfo = (props : HelperTextInfoProps) => {
  return (
    <View>
      <HelperText type="info" style={styles.helperText}>
      {props.info}
    </HelperText>
    </View>
  )
}

const styles = StyleSheet.create({
  helperText: {
    fontSize: 18, 
    color: 'green', 
    padding: 10, 
  },
});

export default HelperTextInfo
