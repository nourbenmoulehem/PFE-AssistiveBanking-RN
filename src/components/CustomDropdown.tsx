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
}
const CustomDropdownComponent : React.FC<CustomDropdownProps> = ( {data , bgColor, iconColor}) => {
  const [value, setValue] = useState<string | null>(null);

  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: bgColor,
      borderRadius: 12,
      padding: 12,
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
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
  const renderItem = (item: { label: string; value: string }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <View style={styles.icon}>
            <Icon
              source="history"
              size={hp(5)}
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
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value as string | null);
      }}
      renderLeftIcon={() => (
        <View style={styles.icon}>
          <Icon
            source="history"
            size={hp(5)}
            color={iconColor}
          />
        </View>
      )}
      renderItem={renderItem}
    />
  );
};

export default CustomDropdownComponent;

