import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface ImagePickerProps {
  handleChange: (imageUri: string | undefined) => void;
  setSelectedImage: (uri: string | undefined) => void;
  selectedImage: string | undefined;
  // touched: any;
  // errors: any;
  field: string;
  title: string;
  name: string;
}
// redux
import {useSelector} from 'react-redux';
import {RootState} from '../context/store';
import {tokens} from '../assets/palette';
import {FormikHandlers, useFormikContext} from 'formik';
import InputTitle from './InputTitle';
// options for opening camera
// type safety
type Options = {
  mediaType: 'photo' | 'video' | 'mixed';
  includeBase64: boolean;
  maxHeight: number;
  maxWidth: number;
};

const options: Options = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: wp(30),
  maxWidth: wp(30),
};

const ImagePicker: React.FC<ImagePickerProps> = ({
  setSelectedImage,
  selectedImage,
  // touched,
  // errors,
  field,
  title,
  name
}) => {
  const {mode} = useSelector((state: RootState) => state.global);
  const colors:any = tokens(mode);
  const formikContext = useFormikContext();
  const handleChange = (imageUri: string | undefined) => {
    const {setFieldValue} = formikContext;
    setFieldValue(field, imageUri); // Update 'image' with your form field name
  };

  const styles = StyleSheet.create({
    openGaleryButton: {
      height: wp(35),
      flex: 1,
      borderRadius: wp(4),
      backgroundColor: colors.secondary[400],
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    openCameraButton: {
      height: wp(35),
      flex: 1,
      borderRadius: wp(4),
      backgroundColor: colors.secondary[200],
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    TextButtonNextPrev: {
      color: colors.main.fontColor,
      fontSize: wp(5),
      fontWeight: 'bold',
      letterSpacing: 1,
      textAlign: 'center',
    },
    linkText: {
      color: colors.secondaryAccent[700],
      fontSize: wp(5),
      fontWeight: 'bold',
      letterSpacing: 1,
    },
  });
  return (
    <>
      <InputTitle title={title} />
      <View
        style={{
          flexDirection: 'row',
          width: wp(89),
          justifyContent: 'space-around',
          gap: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.openGaleryButton}
          onPress={() => {
            launchImageLibrary(options, response => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.errorMessage) {
                console.log(
                  'Image picker errorMessage: ',
                  response.errorMessage,
                );
              } else {
                let imageUri = response.assets ? response.assets[0].uri : '';
                console.log('🚀 ~ imageUri:', imageUri);
                handleChange(imageUri);
                setSelectedImage(imageUri);
              }
            });
          }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Ouvrir la galerie pour choisir une photo de votre ${name}`}
          // accessibilityHint="Double-tap pour ouvrir la galerie."
          >
          <Icon name="image-search-outline" size={wp(10)} color={colors.background[300]} />
          <Text style={styles.TextButtonNextPrev}>ouvrir la galerie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.openCameraButton}
          onPress={() => {
            launchCamera(options, response => {
              if (response.didCancel) {
                console.log('User cancelled camera');
              } else if (response.errorMessage) {
                console.log('Camera errorMessage: ', response.errorMessage);
              } else {
                let imageUri = response.assets ? response.assets[0].uri : '';
                setSelectedImage(imageUri);
                handleChange(imageUri);

                console.log(imageUri);
              }
            });
          }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Ouvrir la caméra pour prendre une photo de votre ${name}`}
          // accessibilityHint="Double-tap pour ouvrir la caméra."
          >
          <Icon name="camera-enhance-outline" size={wp(10)} color={colors.background[300]} />
          <Text style={styles.TextButtonNextPrev}>ouvrir la caméra</Text>
        </TouchableOpacity>
      </View>

      <View>
        {selectedImage ? (
          <Image
            source={{uri: selectedImage}}
            style={{width: wp(50), height: wp(50)}}
            alt={`votre ${field} `}
            accessible={true}
            accessibilityLabel={`Votre ${field}`}
          />
        ) : (
          <Text style={styles.linkText}> aucune image </Text>
        )}
      </View>
      
    </>
  );
};

export default ImagePicker;
