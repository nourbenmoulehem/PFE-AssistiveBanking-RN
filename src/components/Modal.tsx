import React from 'react';
import { Modal, Portal, Text, Button } from 'react-native-paper';

interface ErrorModalProps {
  visible: boolean;
  error: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ visible, error, onClose }) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={onClose} accessibilityLabel="Fermer">
          Fermer
        </Button>
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