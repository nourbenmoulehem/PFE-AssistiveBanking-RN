import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import { tokens } from '../../assets/palette';
import { Divider, Icon } from 'react-native-paper';
import { useGetClientsQuery, useGetNotificationsQuery } from '../../API/ClientApi';

const Notification = () => {
  const navigation = useNavigation();
  const { mode, user } = useSelector(
    (state: RootState) => state.global,
  );
  const colors: any = tokens(mode);
  const { data: notifications, error, isLoading } = useGetNotificationsQuery(user?.clientId);
  
  console.log('====================================');
  console.log(user?.clientId);
  console.log('====================================');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.main.backgroundColor,
    },
  
    libelle: {
      color: colors.main.pass,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'left',
      fontSize: wp(6),
      marginVertical: wp(3),
      marginLeft: wp(5),
    },
    devider: {
      height: wp(0.35),
      width: wp('100%'),
      backgroundColor: colors.background[300],
    },
    card: {
      marginBottom: wp(2),
    },
    notif: {
      fontSize: wp(5),
      fontWeight: 'bold',
      marginVertical: wp(1),
      color: colors.main.fontColor,
      textTransform: 'capitalize',
    },
    date: {
      fontSize: wp(3),
      color: colors.main.fontColor,
    },
    desc: {
      fontSize: wp(4),
      color: colors.main.fontColor,
    },
    icon: {
      flexDirection: 'row',
      gap: wp(6),
      margin: wp(2),
      alignItems: 'flex-start',
    },
    itemDesc: {
      flexDirection: 'column',
    },
    empty: {
      fontSize: wp(4),
      fontWeight: 'bold',
      color: colors.main.warning,
      textAlign: 'center',
      marginTop: wp(10),
    },
  });

  const renderItem = ({ item }: { item: any }) => (
    <>
      <TouchableOpacity
        onPress={() => {}}
        style={{ width: wp(89), alignSelf: 'flex-start', paddingHorizontal: wp(4) }}
        accessibilityRole="button"
      >
        <View style={styles.icon}>
          {item.type === 'virement' ? (
            <Icon source="check" size={wp(6)} color={colors.main.passText} />
          ) : (
            <Icon source="reply-outline" size={wp(6)} color={colors.main.warning} />
          )}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: wp(78), justifyContent: 'space-between' }}>
            <View style={styles.itemDesc}>
              <Text style={styles.notif}>{item.type}</Text>
              <Text style={styles.desc}>{item.notif}</Text>
            </View>
            <Text style={[styles.date, { margin: wp(2) }]}>{item.notifDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider style={styles.devider} />
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.libelle}>Vos notifications</Text>
      <Divider style={styles.devider} />
      {(!notifications || notifications.length === 0) ? (
        <Text style={styles.empty}>Aucune notification à afficher</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.notifId.toString()}
          accessibilityLabel="Liste des notifications"
        />
      )}
    </View>
  );
};

export default Notification;
