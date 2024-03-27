import * as React from 'react';
import {StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import {FAB} from 'react-native-paper';
import {
  PorcupineManager,
  BuiltInKeywords,
  PorcupineErrors,
} from '@picovoice/porcupine-react-native';

const FloatingButton = () => {
  let recordAudioRequest;
  const ACCESS_KEY = "pfkjx/OKWZLZi4tC/3OSSr027rsRC0ToMGypPUMwUleYrqjjHfPmdA==";
  const KEYWORD_FILE_PATH = "../";

  const _requestRecordAudioPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: '[Permission explanation]',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return (granted === PermissionsAndroid.RESULTS.GRANTED)
  }

  if (Platform.OS == 'android') {
    // For Android, we need to explicitly ask
    recordAudioRequest = _requestRecordAudioPermission();
  } else {
    // iOS automatically asks for permission
    recordAudioRequest = new Promise(function (resolve, _) {
      resolve(true);
    });
  }

  recordAudioRequest.then(async (hasPermission) => {
    if(hasPermission){
      // Code that uses Porcupine
      console.log('Permission granted');

      try {
        const detectionCallback = (keyword: any) => {
          console.log(`Keyword detected: ${keyword}`);
        };
  
        let porcupineManager = await PorcupineManager.fromKeywordPaths(
          ACCESS_KEY,
          ["../android/app/src/main/assets/we-bank_en_android_v3_0_0.ppn"],
          detectionCallback
        );
      } catch (error) {
        console.log('Error initializing Porcupine:', error);
        
      }
      
      
    }
  });

  
  
  return (
    <FAB
      icon="microphone"
      style={styles.fab}
      onPress={() => console.log('Pressed')}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FloatingButton;
