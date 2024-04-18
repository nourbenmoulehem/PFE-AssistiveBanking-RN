import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


interface CustomDropdownProps {
  data: { label: string; value: string }[];
  bgColor: string;
  iconColor: string;
  textColor: string;
  searchColor: string;
  onValueChange?: (value: string) => void;
}
const CustomDropdownComponent : React.FC<CustomDropdownProps> = ( {data , bgColor, iconColor, textColor, searchColor, onValueChange}) => {
  const [value, setValue] = useState<string | null>(null);

  const styles = StyleSheet.create({
    dropdown: {
      marginTop: wp(0),
      margin: wp(3),
      height: hp(9),
      width: wp(89),
      backgroundColor: bgColor,
      borderRadius: wp(4),
      padding: wp(4),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
  
      elevation: 2,
    },
    dropdownContainer: {
      
      width: wp(89),
      padding: wp(4),
      backgroundColor: bgColor,
      borderRadius: wp(4),
      borderColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
  
      elevation: 2,
    },
    icon: {
      marginRight: wp(2),
    },
    item: {
      padding: wp(5),
      borderRadius: wp(4),
      margin: wp(2),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: searchColor,
    },
    textItem: {
      flex: 1,
      color: textColor,
      fontSize: wp(5),
      fontWeight: 'bold',
    },
    placeholderStyle: {
      color: textColor,
      fontSize: wp(5),
      fontWeight: 'bold',
    },
    selectedTextStyle: {
      color: textColor,
      fontSize: wp(5),
      fontWeight: 'bold',
    },
    iconStyle: {
      width: wp(6),
      height: wp(6),
    },
    inputSearchStyle: {
      borderRadius: wp(4),
      backgroundColor: searchColor,
      borderColor: 'transparent',
      height: hp(9),
      color: textColor,
      fontSize: wp(5),
      fontWeight: 'bold',
    },
  });
  const renderItem = (item: { label: string; value: string }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <View style={styles.icon}>
            <Icon
              source="check-circle-outline"
              size={hp(3)}
              color={iconColor}
            />
          </View>
        )}
      </View>
    );
  };
  
  return (
    <Dropdown
      style={styles.dropdown}
      containerStyle={styles.dropdownContainer}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={hp(50)}
      labelField="label"
      valueField="value"
      placeholder="Selectionner un bénéficiaire"
      searchPlaceholder="Rechercher..."
      value={value}
      onChange={item => {
        setValue(item.value as string | null);
        if (onValueChange) {
          onValueChange(item.value);
        }
      }}
      renderLeftIcon={() => (
        <View style={styles.icon}>
          <Icon
            source="account-convert"
            size={hp(3)}
            color={iconColor}
          />
        </View>
      )}
      renderItem={renderItem}
      accessibilityLabel='Selectionner un bénéficiaire'
      itemAccessibilityLabelField="itemAccessibilityLabelField"
    />
  );
};

export default CustomDropdownComponent;

