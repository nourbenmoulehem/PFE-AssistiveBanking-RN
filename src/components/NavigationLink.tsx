import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

// navigation
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

interface NavigationLinkProps {
  navigationTarget: keyof RootStackParamList;
  text?: string;
  linkText: string;
  navigation: NativeStackScreenProps<
    RootStackParamList,
    'SignIn'
  >['navigation'];
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  navigationTarget,
  text,
  linkText,
  navigation,
}) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors = tokens(mode);

  const styles = StyleSheet.create({
    linkText: {
      color: colors.main.buttonColor,
      fontSize: 15,
      fontWeight: 'bold',
      margin: 10,
    },
    linksWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      gap: 20,
    },
    textNotLinked: {
      color: mode == 'dark' ? 'white' : 'black',
      fontSize: 15,
      fontWeight: 'bold',
    },
  });
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="link"
      accessibilityLabel={linkText}
      accessibilityHint={`Dirige vers l'écran ${navigationTarget}`}
      onPressIn={() => navigation.navigate(navigationTarget)}>
      <Text style={styles.textNotLinked}>
        {text} <Text style={styles.linkText}>{linkText}</Text>{' '}
      </Text>
    </TouchableOpacity>
  );
};

export default NavigationLink;
