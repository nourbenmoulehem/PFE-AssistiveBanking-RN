// CustomSwitch.tsx
import React, {FC} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

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
      width: '100%',
      padding: 30,
      alignItems: 'center',
    },
    confirmationText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: mode === 'dark' ? colors.secondary[900] : colors.secondary[100],
    },
    linkText: {
      color: colors.main.buttonColor,
      fontSize: 16,
      fontWeight: 'bold',
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
