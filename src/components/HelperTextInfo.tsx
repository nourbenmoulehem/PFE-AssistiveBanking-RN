import { StyleSheet, Text, View } from 'react-native'
import { HelperText } from 'react-native-paper'
import React from 'react'

type HelperTextInfoProps = {
  info: string
}

const HelperTextInfo = (props : HelperTextInfoProps) => {
  const styles = StyleSheet.create({
    helperText: {
      fontSize: 18, // larger font size for better readability
      color: 'green', // dark color for better contrast
      padding: 10, // padding for better spacing
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

const styles = StyleSheet.create({})