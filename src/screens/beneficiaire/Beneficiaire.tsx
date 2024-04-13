import React, {useEffect, useState} from 'react'; // Import the missing useState hook
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {TextInput, TouchableRipple, Icon} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {RootState} from '../../context/store';
import {
  useGetBeneficiairesQuery
} from '../../API/ClientApi';
import {tokens} from '../../assets/palette';
import axios from 'axios';

// components
import Confirmation from '../../components/ConfirmationModel';
import ConfirmationV2 from '../../components/ConfirmationModelV2';
import AddBeneficiaire from '../../components/AddBeneficiareModel';


const Beneficiaire = () => {
  const {mode, user} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);
  const [deleteIconColor, setDeleteIconColor] = useState(colors.main.fontColor);
  const {data, isLoading, error} = useGetBeneficiairesQuery(user?.clientId);
  const [pressedItemId, setPressedItemId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [beneficiaires, setBeneficiaires] = useState([]);
  const [confirmationItem, setConfirmationItem] = useState<{nom: string, rib: string}>({nom: '', rib: ''});
  const [addBeneficiaire, setAddBeneficiaire] = useState(false);

  useEffect(() => {
    if (data) {
      setBeneficiaires(data);
    }
  }, [data]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.main.backgroundColor,
    },
    libelle: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'left', 
      fontSize: wp(6), 
      marginBottom: wp(3)
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.main.rectangleColor,
      borderRadius: wp(4),
      padding: wp(2.5),
      margin: wp(1),
      width: wp(90)
    },
    nameText: {
      color: colors.main.new,
      fontWeight: 'bold',
      fontSize: wp(4),
    },

    ribText: {
      color: colors.main.gaugeBG,
      fontSize: wp(4),
      fontWeight: 'bold',
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: wp(20)

    }
    
    
  });


  // const renderItem = (item: any) => {
  //   console.log("🚀 ~ renderItem ~ item:", item)
  //   const isPressed = item.id === pressedItemId;
  //   const iconColor = isPressed ? 'black' : colors.main.dangerText;    
  //   return (
  //     <View style={styles.infoContainer}>
        
  //       <TouchableWithoutFeedback
  //         onPress={() => {
  //           console.log('item', item);
  //         }}
  //         style={{width: wp(90)}}
  //         accessible={true}
  //         accessibilityLabel={`Bénéficiaire ${item.id}`}
  //         accessibilityHint={`Bénéficiaire avec le ${item.nom} et le rib ${item.rib}`}
  //         >
  //         <View >
  //           <Icon source="account" color={colors.main.fontColor} size={wp(6)} />
  //           <View>
  //             <Text style={styles.nameText}>{item.nom}</Text>
  //             <Text style={styles.ribText}>{item.rib}</Text>
  //           </View>
  //         </View>
  //       </TouchableWithoutFeedback>
  //       <View style={styles.actionButtons}>
  //         <TouchableRipple
  //         onPressIn={() => {
  //             setDeleteIconColor('black')
  //             setPressedItemId(item.id)
  //           }}
  //         onPressOut={() => setDeleteIconColor(colors.main.dangerText)}
  //           onPress={() => {
  //             setVisible(true);
  //             setConfirmationItem(item);
  //           }}
  //         >
  //           <Icon source="delete" color={ isPressed ? "pink" : "black"} size={wp(8)}/>
  //         </TouchableRipple>
          
  //         <Icon source="update" color={colors.main.fontColor} size={wp(8)}/>
  //       </View>

        
  //     </View>
  //   );
  // }

  const renderItem = (item: any) => {
    const isPressed = item.id === pressedItemId;
    const iconColor = isPressed ? 'black' : colors.main.dangerText;    
    return (
      <View style={styles.infoContainer}>
        
        <TouchableRipple
          onPress={() => {
            setVisible(true);
            setConfirmationItem(item);
          }}
          style={{width: wp(90)}}
          accessible={true}
          accessibilityLabel={`Bénéficiaire avec le ${item.nom} et le rib ${item.rib}`}
          accessibilityHint={`Double clique pour modifier ou supprimer le bénéficiaire ${item.nom} avec le rib ${item.rib} `}
          >
          <View >
            <Icon source="account" color={colors.main.fontColor} size={wp(6)} />
            <View>
              <Text style={styles.nameText}>{item.nom}</Text>
              <Text style={styles.ribText}>{item.rib}</Text>
            </View>
          </View>
        </TouchableRipple>

        
      </View>
    );
  }


  function hideDialog(): void {
    setVisible(false);
  }

  const addBeneficiaireClose = () => {
    setAddBeneficiaire(false);
  }

  return (
    <>
    
    <View style={styles.container}>
    <Text
        style={styles.libelle}>
        Votre liste de bénéficiaires
      </Text>
      
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: wp(90),
          marginBottom: wp(3),
        
        }}
      >
      <TouchableRipple style={{flexDirection: 'row', justifyContent: 'center', gap: wp(2), padding: wp(4), backgroundColor: colors.background[200], borderRadius: wp(6), 
        }} rippleColor="pink" onPressIn = {() => setAddBeneficiaire(true)}
        >
        <View  style={{flexDirection: 'row', justifyContent: 'center', gap: wp(2),  backgroundColor: colors.background[200], borderRadius: wp(6)
        }} >
          <Icon source="account" color={colors.main.fontColor} size={wp(6)} />
            <Text style={styles.ribText}>Ajouter</Text>

        </View>
      </TouchableRipple>
      </View>
      
      <FlatList
        data={beneficiaires}
        keyExtractor={(item: { id: number }) => item.id.toString()} // Add type annotation to item
        renderItem={({item}) => renderItem(item)}
          
        
      />

    <ConfirmationV2 visible={visible} item={confirmationItem} hideDialog={hideDialog} />
    <AddBeneficiaire visible={addBeneficiaire} hideDialog={addBeneficiaireClose} />
    </View>
    </>
  );
};

export default Beneficiaire;
