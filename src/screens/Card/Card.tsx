import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { tokens } from '../../assets/palette';
import { Divider, List, Icon } from 'react-native-paper';
// storage
import * as Keychain from 'react-native-keychain';

// api manage (custom hook)
import getApi from '../../API/APIManager';

// navigation
import { RootStackParamListSignedIn } from '../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DarkTheme } from '@react-navigation/native';
import { useGetClientsQuery } from '../../API/ClientApi';

//component
import CreditCard from '../../components/CreditCard';

// ...





const Card = () => {

    const {data, isLoading, error} = useGetClientsQuery(1);
      console.log("🚀 ~ card:", data , error)


      const dispatch = useDispatch();
      const { isLoggedIn, mode, user } = useSelector(
        (state: RootState) => state.global,
      );
      console.log('🚀 ~ card ~ isLoggedIn:', isLoggedIn);
      const colors = tokens(mode);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: colors.main.backgroundColor,

        },
        miniContainer: {
            margin: wp(1),
            padding: wp(1),
            flexDirection: 'row',
            justifyContent: 'space-between'
          },
        midContainer: {
            margin: wp(3),
            padding: wp(1),
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
          },
          spendings: {
            margin: wp(3),
            padding: wp(1),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          },
          last: {
            flex:1,
            borderRadius: hp(2),
            backgroundColor: mode === 'dark' ? colors.background[300] : colors.background[300],
            justifyContent: 'center',
            alignItems: 'center',
      
          },
          current: {
            flex:1,
            borderRadius: hp(2),
            backgroundColor: mode === 'dark' ? colors.background[300] : colors.background[300],
            justifyContent: 'center',
            alignItems: 'center',

          },
        text: {
            color: colors.main.fontColor,
        },

    });

    return (
        <View style={styles.container}>
            <View style={styles.miniContainer}>
                {data && data.firstName && data.lastName && data.compteBancaire.carte.numero_carte && /*  data.compteBancaire.carte.date_expiration && */ <CreditCard name={data.firstName} lastName={data.lastName} cardNumber={data.compteBancaire.carte.numero_carte} /* expirationDate={data.compteBancaire.carte.date_expiration} */ />}
            </View>

            <View style={styles.midContainer}>
                <View>
                    <Text style={styles.text}>Status</Text>
                </View>
                <View>
                    <Text style={styles.text}>Expiration Date</Text>
                </View>
                <View>
                    <Text style={styles.text}>Plafond</Text>
                </View>
                <View style={styles.spendings}>
                    <View style={styles.last} >
                        <Text style={styles.text}>Last Month spending</Text>
                    </View>
                    <View style={styles.current}>
                        <Text style={styles.text}>This Month spendings</Text>
                    </View>

                </View>
                
            </View>
        </View>
    );
};

export default Card;