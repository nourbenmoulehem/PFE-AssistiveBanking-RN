import * as React from 'react';
import {StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import {FAB} from 'react-native-paper';
import {
  PorcupineManager,
  BuiltInKeywords,
  PorcupineErrors,
} from '@picovoice/porcupine-react-native';
import RNFS from 'react-native-fs';
import Voice from '@react-native-community/voice';

// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';

let floatButtonBackgroundColor: string = '';

const FloatingButton = () => {
  const [isDetected, setIsDetected] = React.useState(false);

  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);
  let recordAudioRequest;
  const ACCESS_KEY = 'pfkjx/OKWZLZi4tC/3OSSr027rsRC0ToMGypPUMwUleYrqjjHfPmdA==';
  // let keywordName = 'hey_siri'; // we-bank_en_android_v3_0_0
  // let keywordFilename = `${keywordName}.ppn`;
  const keywordFilename = 'we-bank_en_android_v3_0_0.ppn';
  let keywordPath;
  const isAndroid = Platform.OS === 'android';

  const _requestRecordAudioPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: '[Permission explanation]',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  if (Platform.OS == 'android') {
    // For Android, we need to explicitly ask
    recordAudioRequest = _requestRecordAudioPermission();
  } else {
    // iOS automatically asks for permission
    recordAudioRequest = new Promise(function (resolve, _) {
      resolve(true);
    });
  }

  recordAudioRequest.then(async hasPermission => {
    if (hasPermission) {
      // Code that uses Porcupine
      console.log('Permission granted');

      try {
        if (isAndroid) {
          console.log(RNFS.DocumentDirectoryPath);

          keywordPath = `${RNFS.DocumentDirectoryPath}/${keywordFilename}`;

          // let files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
          // console.log("Files in directory:");
          // files.forEach(file => {
          //   console.log(file.name);
          // });;

          await RNFS.copyFileAssets(keywordFilename, keywordPath);
        } else {
          keywordPath = `${RNFS.MainBundlePath}/${keywordFilename}`;
        }

        const detectionCallback = (keyword: any) => {
          console.log('Detection callback called');

          // setIsDetected(true);

          console.log(`Keyword detected: ${keyword}`);
          try {

            Voice.start('en-US');

            Voice.isAvailable().then(available => {
              if (available) {
                // Start voice recognition here
                console.log('Voice recognition is available on this device');
              } else {
                console.log(
                  'Voice recognition is not available on this device',
                );
              }
            });

            Voice.onSpeechStart = () => {
              console.log('Speech has started');
            };

            Voice.onSpeechResults = result => {
              console.log('test test test');
          
              console.log('Transcribed text:', result.value);
            };

          } catch (error) {
            console.log('error', error);
          }
        };


        // let porcupineManager = await PorcupineManager.fromBuiltInKeywords(
        //   ACCESS_KEY,
        //   [BuiltInKeywords.BUMBLEBEE],
        //   detectionCallback
        // );

        let porcupineManager = await PorcupineManager.fromKeywordPaths(
          ACCESS_KEY,
          [keywordPath],
          detectionCallback,
        );

        await porcupineManager.start();
        console.log('PorcupineManager started');
        console.log(
          '🚀 ~ recordAudioRequest.then ~ porcupineManager:',
          porcupineManager,
        );
      } catch (error) {
        console.log('Error initializing Porcupine:', error);
      }
    }
  });

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: colors.accent[400],
    },
  });

  function startVoiceRecognition(): void {
    // THIS IS JUST FOR TESTING PURPOSES, speech recognition start when wake word is detected
    try {
      Voice.start('en-US');
      Voice.isAvailable().then(available => {
        if (available) {
          // Start voice recognition here
          console.log('Voice recognition is available on this device');
        } else {
          console.log('Voice recognition is not available on this device');
        }
      });

      Voice.onSpeechStart = () => {
        console.log('Speech has started');
      };

      Voice.onSpeechResults = result => {
        console.log('Transcribed text:', result.value);
      };
    } catch (error) {
      console.log('Error starting voice recognition:', error);
    }
  }

  return (
    <FAB
      icon="microphone"
      style={styles.fab}
      onPress={() => startVoiceRecognition()}
    />
  );
};

export default FloatingButton;
