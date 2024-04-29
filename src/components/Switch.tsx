// CustomSwitch.tsx
import React, {FC} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  text: string;
}

const CustomSwitch: FC<CustomSwitchProps> = ({value, onValueChange, text}) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);
  const styles = StyleSheet.create({
    switchContainer: {
      flexDirection: 'row',
      width: wp(89),
      padding: wp(5),
      alignItems: 'center',
      alignSelf: 'center',
    },
    confirmationText: {
      fontSize: wp(4),
      fontWeight: 'bold',
      color: colors.main.fontColor,
    },
  
  });

  return (
    <View style={styles.switchContainer}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        accessible={true}
        accessibilityRole="switch"
        accessibilityLabel={text}
        accessibilityState={{checked: value}}
      />
      <Text style={styles.confirmationText}>{text}</Text>
    </View>
  );
};

export default CustomSwitch;
