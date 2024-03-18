import React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';

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
    'SignIn'
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
  const colors = tokens(mode);

  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius: 8,
    },
    errorText: {
      color: 'black',
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    Button: {
      backgroundColor: colors.main.buttonColor,
      padding: 10,
      margin: 30,
      height: 60,
      width: 275,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    TextButton: {
      color: mode === 'dark' ? 'white' : 'black',
      fontSize: 20,
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
