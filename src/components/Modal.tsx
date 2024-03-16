import React from 'react';
import { Modal, Portal, Text, Button, ActivityIndicator } from 'react-native-paper';

interface ErrorModalProps {
  visible: boolean;
  error?: string;
  isLoading?: boolean;
  isRedirectSignIn?: boolean;
  onClose: () => void;

}

const ErrorModal: React.FC<ErrorModalProps> = ({ visible, error, isLoading, isRedirectSignIn, onClose }) => {
  console.log(isRedirectSignIn, 'isRedirectSignIn'); // TODO: when isRedirectSignIn is true, redirect to SignIn screen when clicking on the button "Fermer" and modify accessibility label or hint with the appropriate message
  
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        { isLoading ? <ActivityIndicator /> : 
          <>
            <Text style={styles.errorText}>{error}</Text>
            <Button mode="contained" onPress={onClose} accessibilityLabel="Fermer">
              Fermer
            </Button>
          </>
        }
      </Modal>
    </Portal>
  );
};

const styles = {
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 10,
  },
};

export default ErrorModal;