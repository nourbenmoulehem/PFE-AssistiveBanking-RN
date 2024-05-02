import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Dialog,
  Portal,
  ActivityIndicator,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

interface Props {
  loading: boolean;
  visible: boolean;
  hideDialog: () => void;
  message: string;
}

const Confirmation: React.FC<Props> = ({
  visible,
  hideDialog,
  message,
  loading,
}) => {
  console.log('🚀 ~ message:', message);
  const {mode, user} = useSelector((state: RootState) => state.global);
  const colors: any = tokens(mode);
  const [success, setSuccess] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //alignItems: 'center',
      padding: 20,
      backgroundColor: colors.main.backgroundColor,
    },
    title: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'left',
    },
    dialogContent: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: wp('9'),
    },
    inputFieldsWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    },
    actionButton: {
      //padding: 10,
      backgroundColor: colors.main.new,
      borderRadius: wp(4),
      width: wp('50'),
      height: hp('7'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textSupprimer: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      fontSize: wp(4),
    },
    info: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: wp('3'),
    },
    fermerButton: {
      backgroundColor: colors.main.gaugeBG,
      borderRadius: 5,
      width: wp('25'),
      height: hp('7'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textFermer: {
      color: colors.main.fontColor,
      fontWeight: 'bold',
      fontSize: wp(4),
    },
  });

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} style={styles.container}>
        {/* <Dialog.Title style={styles.title}>
          Virement
        </Dialog.Title> */}
        <Dialog.Content style={styles.dialogContent}>
          {loading ?
          <ActivityIndicator color={colors.main.buttonColor} size="large" />:
          <>
            <View style={styles.info}>
              <Text
                style={{color: colors.main.fontColor, fontWeight: 'bold', fontSize: wp(6)}}>
                {message}
              </Text>
            </View>

            {isSuccess && (
              <Text style={{color: colors.primary[500], fontWeight: 'bold'}}>
                {message}
              </Text>
            )}
          </>
          } 
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableRipple
            style={styles.fermerButton}
            onPress={() => {
              hideDialog();
              setIsSuccess(false);
              setSuccess('');
            }}>
            <Text style={styles.textFermer}>Fermer</Text>
          </TouchableRipple>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Confirmation;
