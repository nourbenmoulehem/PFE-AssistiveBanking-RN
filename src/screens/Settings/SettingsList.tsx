import * as React from 'react';
import { StyleSheet } from 'react-native';
import {List, Text} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { tokens } from '../../assets/palette';

// react navigation
import { useNavigation } from '@react-navigation/native';
import { RootStackParamListSignedIn } from '../../../App';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// components
import ListItemComponent from '../../components/ListItemComponent';

const SettingsList = () => {

  const { isLoggedIn, mode, user } = useSelector(
    (state: RootState) => state.global,
  );
  const colors:any = tokens(mode);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamListSignedIn, 'Settings'>>();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: wp(100),
    },
  });

  return (
    <List.Section style={styles.container}>
      <List.Subheader><Text>Votre preferences</Text></List.Subheader>

      
      <ListItemComponent title="Modifier les préférences de couleur" iconName="theme-light-dark" onPressIn={() => navigation.navigate('ColorPreferences')} />
      <ListItemComponent title="Modifier le mot de passe" iconName="key" onPressIn={() => navigation.navigate('ChangePassword')} />
    </List.Section>
  );

  
};

export default SettingsList;
