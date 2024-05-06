import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {List, Text, Headline} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {setMode} from '../../context/globalReducer';
import {tokens} from '../../assets/palette';

// components
import ListItemComponent from '../../components/ListItemComponent';

const ColorPreferences = () => {
  const dispatch = useDispatch();
  const {isLoggedIn, mode, user} = useSelector(
    (state: RootState) => state.global,
  );
  const colors:any = tokens(mode);
  
  type mode = "dark" | "light" | "protanopia" | "deuteranopia" | "tritanopia";

  const toggleMode = (mode: mode) => {
    dispatch(setMode(mode));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: wp(100),
      height: hp(100),
      backgroundColor: colors.main.backgroundColor,

    },
    text: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      margin: hp(2),
      fontSize: wp(5)
    },
  });
  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader><Text style={styles.text}>Choisissez la couleur appropriée qui vous convient</Text></List.Subheader>
        <ListItemComponent title="Sombre" iconName="moon-waning-crescent" onPressIn={() => toggleMode("dark")} />
        <ListItemComponent title="Clair" iconName="white-balance-sunny" onPressIn={() => toggleMode("light")}/>
        <ListItemComponent title="Protanopie" iconName="creation" onPressIn={() => toggleMode("protanopia")}/>
        <ListItemComponent title="Deuteranopie" iconName="eye-check" onPressIn={() => toggleMode("deuteranopia")}/>
        <ListItemComponent title="Tritanopie" iconName="eye-circle-outline" onPressIn={() => toggleMode("tritanopia")}/>
      </List.Section>
    </ScrollView>
  );
};

export default ColorPreferences;

const styles = StyleSheet.create({});
