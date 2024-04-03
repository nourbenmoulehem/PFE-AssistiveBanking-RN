  import React, {useState, useEffect} from 'react';
  import {StyleSheet, Platform, PermissionsAndroid} from 'react-native';
  import {FAB} from 'react-native-paper';
  import Voice from '@react-native-voice/voice';
  import Tts from 'react-native-tts';
  // redux
  import {useSelector, useDispatch} from 'react-redux';
  import {RootState} from '../context/store';
  import {useLazyGetIntentQuery} from '../API/ClientApi';
  import {tokens} from '../assets/palette';
import axios from 'axios';

  const FloatingButton = () => {
    const dispatch = useDispatch();
    const {mode, user } = useSelector(
      (state: RootState) => state.global,
    );



    const [prompt, setPrompt] = useState('');
    const [spoken, setSpoken] = useState(false); // Flag to track if TTS has spoken
    const [response, setResponse] = useState('');
    const [prompts, setPrompts] = useState<string[]>([]); 

    // const [trigger, { data, error, isLoading, isSuccess }] = useLazyGetIntentQuery();
    // console.log('🚀 ~ FloatingButton ~ data:', data);
    // console.log('🚀 ~ FloatingButton ~ error:', error);
    // console.log('🚀 ~ FloatingButton ~ prompt:', prompt);
    // if(data){
    //   setResponse(data.assistantResponse);
    // }

    //user?.clientId
    const handleVocalCommand = (prompts: string[]) => {
      axios.post('http://192.168.1.7:5001/api/v1/client/getIntent', {prompts: prompts, clientId: 1})
      .then((response) => {
        console.log("handleVocal", response.data);
        setResponse(response.data.assistantResponse);
        Tts.setDefaultLanguage('fr-FR');
        Tts.speak(response.data.assistantResponse);
      })
      
        
        // Tts.speak(response);
        setSpoken(true);
    }
    const colors = tokens(mode);
    const [isRecording, setIsRecording] = useState(false);
    const isAndroid = Platform.OS === 'android';

    useEffect(() => {
      if (prompt !== '') {
        // trigger({ prompt: prompt });
        handleVocalCommand(prompts);
      }

      // to reset the prompt and spoken flag
      return () => {
        setPrompt('');
        setSpoken(false);
      };
    }, [prompt]);

    // Tts.setDefaultLanguage('fr-FR');

    useEffect(() => {
      requestRecordAudioPermission();
    }, []);

    // useEffect(() => {
    //   // Update response state when data changes
    //   if (isSuccess && data && data.assistantResponse) {
        
    //     setResponse(data.assistantResponse);
    //   }
    // }, [isSuccess, data, response]);

    // useEffect(() => {
    //   // Speak the response when isSuccess is true and response has changed
    //   if (isSuccess && response && !spoken) {
    //     Tts.setDefaultLanguage('fr-FR');
        
    //     Tts.speak(response);
    //     setSpoken(true);
    //   }
    // }, [isSuccess, response, spoken]);

    const requestRecordAudioPermission = async () => {
      if (isAndroid) {
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
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission denied');
        }
      }
    };

    const startVoiceRecognition = async () => {
      setIsRecording(true);
      try {
        console.log('About to start voice recognition');

        Voice.onSpeechStart = () => {
          console.log('Speech has started');
        };

        Voice.onSpeechEnd = () => {
          console.log('Speech has ended');
        };

        Voice.onSpeechError = error => {
          console.log('Speech error:', error);
        };

        Voice.onSpeechResults = result => {
          console.log('Transcribed text:', result.value);
          
          if (result.value && result.value.length > 0) {
            setPrompts(result.value);
            console.log('Most likely transcription:', result.value[0]);
            const mostLikelyTranscription = result.value[0];
            setPrompt(mostLikelyTranscription);
            console.log(
              '🚀 ~ startVoiceRecognition ~ mostLikelyTranscription:',
              mostLikelyTranscription,
            );
          } else {
            console.log('No transcribed text found');
          }
          console.log('bye');
        };

        Voice.start('fr-FR');
      } catch (error) {
        console.log('Error starting voice recognition:', error);
        setIsRecording(false);
      }
    };

    const stopVoiceRecognition = async () => {
      setIsRecording(false);
      try {
        await Voice.stop();
      } catch (error) {
        console.log('Error stopping voice recognition:', error);
      }
    };

    return (
      <FAB
        icon={isRecording ? 'stop' : 'microphone'}
        style={styles.fab}
        onPress={() => {
          isRecording ? stopVoiceRecognition() : startVoiceRecognition();
        }}
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
