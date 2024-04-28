import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {useImages} from '../../Utils/Images';
  import Entypo from 'react-native-vector-icons/Entypo';
  import * as yup from 'yup';
  import {TextInput} from 'react-native-paper';
  import CameraModal from '../../Components/ImageModal';
  import {Controller, useForm} from 'react-hook-form';
  import {yupResolver} from '@hookform/resolvers/yup';
  import {emailRegex} from '../../Utils/function';
  import styles from './style';

  
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
    const [profileImg, setprofileImg] = useState('');
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
              <Entypo size={25} color={'white'} name={'camera'} />
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
  
  
  