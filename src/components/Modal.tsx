import React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// navigation
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

interface ErrorModalProps {
  visible: boolean;
  error?: string;
  isLoading?: boolean;
  isRedirectSignIn?: boolean;
  onClose: () => void;
  navigation?: NativeStackScreenProps<
    RootStackParamList,
    'SignUp'
  >['navigation'];
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  visible,
  error,
  isLoading,
  isRedirectSignIn,
  navigation,
  onClose,
}) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);

  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: colors.main.fontColor,
      padding: hp(3),
      margin: hp(2),
      borderRadius: wp(4),
      alignItems: 'center',
    },
    errorText: {
      color: 'black',
      fontSize: wp(4.5),
      fontWeight: 'bold',
      marginBottom: wp(3),
    },
    Button: {
      backgroundColor: colors.main.buttonColor,
      padding: wp(4),
      margin: hp(4),
      
      width: wp(78),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: wp(4),
    },
    TextButton: {
      color: colors.main.fontColor,
      fontSize: wp(5),
      fontWeight: 'bold',
    },
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}>
        {isLoading ? (
          <ActivityIndicator color={colors.main.buttonColor} size='large'/>
        ) : (
          <>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.Button}
              onPressIn={() => {
                if (isRedirectSignIn) {
                  navigation?.navigate('SignIn');
                  onClose();
                } else {
                  onClose();
                }
              }}
              accessibilityRole="button"
              accessibilityLabel="Fermer"
              accessibilityHint={
                isRedirectSignIn
                  ? 'Rediriger vers la page de connexion'
                  : 'Fermer la fenêtre'
              }>
              <Text style={styles.TextButton}>
                {isRedirectSignIn ? 'Aller à la page de connexion' : 'Fermer'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default ErrorModal;
