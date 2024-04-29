import * as React from 'react';
import {StyleSheet} from 'react-native';
import {List, Text} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

type Props = {
  title: string;
  iconName: string;
  onPressIn?: () => void;
  right?: () => void;
};

const ListItemComponent = ({title, iconName, onPressIn}: Props) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);

  const styles = StyleSheet.create({
    titleStyle: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      marginEnd: wp(3),
    },
    listItem: {
      padding: hp(2),
      marginVertical: hp(1),
      marginHorizontal: hp(3),
      borderRadius: hp(2),
      backgroundColor: colors.main.rectangleColor,
    },
  });

  

  return (
    <List.Item
      title={title}
      left={() => <List.Icon icon={iconName} color={colors.accent[300]} />}
      onPressIn={onPressIn}
      titleStyle={styles.titleStyle}
      rippleColor={colors.accent[300]}
      style={styles.listItem}
      accessibilityLabel={title}
      accessibilityRole="button"
      right={
        mode === title.toLowerCase()
          ? () => (
              <List.Icon icon="check-bold" color={colors.accent[300]} />
            )
          : () => null
      }
    />
  );
};

export default ListItemComponent;
