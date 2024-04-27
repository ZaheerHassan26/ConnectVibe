import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useImages} from '../utils/Images';
// import Entypo from 'react-native-vector-icons/Entypo';
import * as yup from 'yup';
import {TextInput} from 'react-native-paper';
import CameraModal from '../Components/ImageModal';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {emailRegex} from '../utils/function';

const schema = yup.object({
  username: yup.string().trim().required(),
  mobile_number: yup
    .string()
    .matches(/^(?:\D*\d){12}\D*$/, 'Invalid phone number')
    .required()
    .label('Phone Number'),
  email: yup
    .string()
    .matches(emailRegex, 'Enter a valid email')
    .required()
    .label('Email'),
  password: yup.string().required('Password is required'),
});

export default function EditProfile() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [profileImg, setprofileImg] = useState<Object>('');
  const {images} = useImages();

  const image = {
    uri: null,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.ImgView}>
          {image.uri ? (
            <View style={styles.imageView}>
              <Image
                source={profileImg ? {uri: profileImg?.path} : images.profile}
                style={styles.profileImg}
              />
            </View>
          ) : (
            <View style={styles.imageView}>
              <Text style={styles.imgTxt}>N/A</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.camImg}
            onPress={() => setShowImageUploadModal(true)}>
            {/* <Entypo size={25} color={'white'} name={'camera'} /> */}
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="username"
                value={value}
                onChangeText={onChange}
                placeholder={'Admintest'}
                placeholderTextColor={'grey'}
                activeUnderlineColor={'#10445C'}
                style={styles.input}
              />
            )}
            name="username"
          />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                placeholder={'example@test.com'}
                placeholderTextColor={'grey'}
                style={styles.input}
                disabled
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                placeholder={'12345'}
                activeUnderlineColor={'#10445C'}
                placeholderTextColor={'grey'}
                style={styles.input}
              />
            )}
            name="password"
          />
        </View>

        <View>
          <TouchableOpacity style={styles.buttonCon}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CameraModal
        setPictureModalVisible={setShowImageUploadModal}
        pictureModalVisible={showImageUploadModal}
        setProfileImage={setprofileImg}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF4F6',
  },
  header: {
    backgroundColor: '#10445C',
    height: 80,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  ImgView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImg: {
    margin: -0.7,
    height: '100%',
    width: '100%',
  },
  imageView: {
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#10445C',
  },
  imgTxt: {
    color: '#10445C',
    fontSize: 40,
    fontWeight: '600',
  },
  camImg: {
    position: 'relative',
    left: 45,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#10445C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    bottom: 40,
    height: 40,
    width: 40,
    overflow: 'hidden',
  },
  input: {backgroundColor: 'transparent', marginVertical: 5},
  buttonCon: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    width: 100,
    height: 54,
    backgroundColor: '#10445C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 20,
  },
  btnText: {color: 'white', fontSize: 20},
});
