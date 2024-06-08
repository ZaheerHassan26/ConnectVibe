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
import firestore from '@react-native-firebase/firestore';

import ImageCropPicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {getStyles} from './style';
import {addNotification as addNotificationAction} from './redux/actions';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import {pick, types} from 'react-native-document-picker';
import {Toast} from 'react-native-toast-notifications';
import ImgToBase64 from 'react-native-image-base64';
import {useEffect} from 'react';
import {convertMillisecondsToTime} from '../../Utils/function'

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const Chat = ({route, theme, addNotificationAction, userDetail}) => {
  const [inputValue, setInputValue] = useState('');
  const [attachment, setAttachment] = useState({});
  const [linkOpen, setLinkOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const navigation = useNavigation();
  const scrollRef = useRef();
  const styles = getStyles(theme);

  const {data, roomID} = route?.params;

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

  const handleSendMessage = async () => {
    if (inputValue.trim() || attachment) {
      firestore()
        .collection('Chats')
        .doc(roomID)
        .collection('MESSAGES')
        .add(
          {
            text: inputValue,
            createdAt: new Date().getTime(),
            user: {
              _id: userDetail?.id,
              email: userDetail?.user_email,
            },
          },
          setInputValue(''),
          setAttachment(''),
        )

        .then(() => {
          const notificationData = {
            sender: userDetail?.id,
            receiver: 6,
            title: 'Hey',
            message: 'New message',
          };
          addNotificationAction(notificationData);
        });
    }
  };

  useEffect(() => {
    const messagesListener = firestore()
      .collection('Chats')
      .doc(roomID)
      .collection('MESSAGES')
      .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot._docs.map(doc => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }
          return data;
        });
        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

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
            {data?.profile_image == null ? (
              <Text style={styles.imgText}>
                {`${data?.name[0]?.toUpperCase()}`}
              </Text>
            ) : (
              <Image
                source={{uri: data?.profile_image}}
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
        <View style={{paddingTop: 45}}>
          {messages.map((item, index) => {
            return (
              <>
                {item?.user?._id == userDetail?.id ? (
                  <View style={styles.sentTextHeader}>
                    {item?.image ? (
                      <TouchableOpacity>
                        <Image
                          style={{
                            width: 170,
                            height: 135,
                            borderRadius: 20,
                            // resizeMode: "contain",
                            marginBottom: 10,
                          }}
                          source={{
                            uri: item?.image,
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      ''
                    )}
                    {item.text ? (
                      <>
                        <View
                          style={[
                            styles.sentHeaderView,
                            {backgroundColor: textColor},
                          ]}>
                          <Text style={styles.sentText}>{item.text}</Text>
                          <Text style={styles.sentTime}> {convertMillisecondsToTime(item.createdAt)}</Text>
                        </View>
                      </>
                    ) : (
                      ''
                    )}
                  </View>
                ) : (
                  <>
                    {item.image ? (
                      <TouchableOpacity>
                        <Image
                          style={{
                            width: 170,
                            height: 135,
                            borderRadius: 20,
                            resizeMode: 'contain',
                            marginBottom: 10,
                          }}
                          source={{
                            uri: item?.image,
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      ''
                    )}
                    {item.text ? (
                      <View style={styles.chatHeader}>
                        <View style={styles.chatView}>
                          <Text style={styles.chatText}>{item?.text}</Text>
                        <Text style={styles.time}> {convertMillisecondsToTime(item.createdAt)}</Text>
                        </View>
                      </View>
                    ) : (
                      ''
                    )}
                  </>
                )}
              </>
            );
          })}
        </View>
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
        <Pressable
          style={[styles.sendBtn, {backgroundColor: inputBackground}]}
          onPress={handleSendMessage}>
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
  userDetail: state?.login?.userDetail?.user,
});

const mapDispatchToProps = dispatch => ({
  addNotificationAction: data => dispatch(addNotificationAction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
