import * as React from 'react';
import { Button, Dialog, Paragraph, Portal, Text } from 'react-native-paper';


interface Props  {
  visible: boolean;
  hideDialog: () => void;
  item: {nom: string, rib: string};
};

const Confirmation: React.FC<Props> = ({visible, hideDialog, item}) => {  

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Êtes-vous sûr(e) de vouloir supprimer cette personne ?</Dialog.Title>
        <Dialog.Content>
          <Text style={{fontSize: 20, fontWeight: 'bold' }}>{item.nom}</Text>
          <Text>{item.rib}</Text>
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