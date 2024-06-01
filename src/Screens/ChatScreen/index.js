import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ImageCropPicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {getStyles} from './style';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import {pick, types} from 'react-native-document-picker';
import {Toast} from 'react-native-toast-notifications';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const Chat = ({route, theme}) => {
  const [inputValue, setInputValue] = useState('');
  const [attachment, setAttachment] = useState({});
  const [linkOpen, setLinkOpen] = useState(false);

  const navigation = useNavigation();
  const scrollRef = useRef();
  const styles = getStyles(theme);

  const {data} = route?.params;
  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setAttachment(image);
    });
  };

  const openGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setAttachment(image);
    });
  };

  const openDocument = () => {
    pick({
      type: [types.pdf, types.docx],
    })
      .then(res => {
        const allFilesArePdfOrDocx = res.every(file => file.hasRequestedType);
        if (!allFilesArePdfOrDocx) {
          Toast.show('Please select a pdf or docx file');
        }
      })
      .catch(e => console.log(e));
  };

  const toggleAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLinkOpen(!linkOpen);
  };

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');
  const imageBackground = useThemeColor('black');
  const inputBackground = useThemeColor('inputBackground');
  const placeholderColor = useThemeColor('placeholder');

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={[styles.header, {backgroundColor: headerBackgroundColor}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons size={25} color={'white'} name={'arrow-back'} />
        </TouchableOpacity>
        <View style={styles.imageDiv}>
          <View
            style={[styles.imageContainer, {backgroundColor: imageBackground}]}>
            {data?.image == null ? (
              <Text style={styles.imgText}>
                {`${data?.name[0]?.toUpperCase()}`}
              </Text>
            ) : (
              <Image
                source={data?.image}
                style={{
                  width: 37,
                  height: 36,
                  borderRadius: 30,
                }}
              />
            )}
          </View>
          <Text style={styles.userName}>{data?.name}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.chatMainHeader}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}>
        <View style={{paddingTop: 45}}></View>
      </ScrollView>
      {linkOpen && (
        <View
          style={[
            styles.inputInnerContainer,
            {
              height: 100,
              justifyContent: 'space-evenly',
              marginHorizontal: 20,
              backgroundColor: inputBackground,
            },
          ]}>
          <TouchableOpacity
            style={{
              backgroundColor: 'purple',
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
            }}
            onPress={openDocument}>
            <Ionicons size={25} color={'white'} name={'document'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
            }}
            onPress={openGallery}>
            <MaterialIcons size={25} color={'white'} name={'insert-photo'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
            }}
            onPress={openCamera}>
            <MaterialIcons size={25} color={'white'} name={'add-a-photo'} />
          </TouchableOpacity>
        </View>
      )}

      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.inputInnerContainer,
            {backgroundColor: inputBackground},
          ]}>
          <View style={styles.leftInputView}>
            <TextInput
              placeholderTextColor={placeholderColor}
              placeholder="Type here..."
              style={[styles.inputText, {color: textColor}]}
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={toggleAnimation}>
              <Entypo size={25} color={textColor} name={'link'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <Entypo size={25} color={textColor} name={'camera'} />
            </TouchableOpacity>
          </View>
        </View>
        <Pressable style={[styles.sendBtn, {backgroundColor: inputBackground}]}>
          <MaterialCommunityIcons
            size={25}
            color={textColor}
            name={inputValue == '' ? 'microphone' : 'send'}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
});

export default connect(mapStateToProps, null)(Chat);
