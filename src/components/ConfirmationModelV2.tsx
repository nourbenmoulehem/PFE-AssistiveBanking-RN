import * as React from 'react';
import { Button, Dialog, Paragraph, Portal, Text, TextInput } from 'react-native-paper';

interface Props  {
  visible: boolean;
  hideDialog: () => void;
  item: {nom: string, rib: string};
};

const Confirmation: React.FC<Props> = ({visible, hideDialog, item}) => {  

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Beneficiaire {item.nom}</Dialog.Title>
        <Dialog.Content >

          
          <TextInput style={{marginBottom: 18}} label="Nom" value={item.nom} />
          <TextInput label="Rib" disabled value={item.rib} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Fermer</Button>
          <Button onPress={() => console.log('Ok')}>Supprimer</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Confirmation;