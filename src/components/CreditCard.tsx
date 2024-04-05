// CreditCard.tsx
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface CreditCardProps {
  name: string;
  lastName:string;
  cardNumber: string;
//   expirationDate: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ name, lastName, cardNumber }) => {
  // Hide all but the last four digits of the card number
  const hiddenCardNumber = cardNumber.replace(/\d(?=\d{4})/g, "*");
  const formattedCardNumber = hiddenCardNumber.replace(/(.{4})/g, "$1 ");
//   const expDate = new Date(expirationDate);
//   const month = String(expDate.getMonth() + 1).padStart(2, '0'); // padStart ensures the month is always 2 digits
//   const year = String(expDate.getFullYear()).slice(-2); // slice(-2) gets the last 2 digits of the year
//   const formattedExpirationDate = `${month}/${year}`;
  return (
    <ImageBackground source={require('C:\\Users\\GAMER\\Desktop\\PFE\\PFE-AssistiveBanking-RN\\src\\assets\\Card\\006.png')} resizeMode="contain" style={styles.card}>
      <Text style={styles.number}>{formattedCardNumber}</Text>
        <Text style={styles.date}>MONTH/YEAR</Text>
        <Text style={styles.name}>06/29</Text>
      <Text style={styles.name}>{name.toUpperCase()} {lastName.toUpperCase()}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
//     flex: 1,
    width: wp('90%'),
    height: hp('27.99%'),
    paddingLeft: wp(11),
    paddingRight: wp(11),
    paddingTop: wp(8),
    paddingBottom: wp(8),
    justifyContent: 'flex-end',
 
  },
  name: {
    color: 'white',
//     textShadowColor: 'black',
//       textShadowOffset: { width: -1, height: 1 },
//       textShadowRadius: 1,
    fontSize: wp(3),
  },
  number: {
  color: 'white',

        fontSize: wp(7), // Adjust as needed
  },
  date: {
    color: 'white',

        fontSize: wp(2), // Adjust as needed
  },
});

export default CreditCard;