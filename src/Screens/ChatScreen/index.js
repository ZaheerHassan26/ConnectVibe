import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
  FlatList,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';

import ImageCropPicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {getStyles} from './style';
import {addNotification as addNotificationAction} from './redux/actions';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import {pick, types} from 'react-native-document-picker';
import {Toast} from 'react-native-toast-notifications';
import {useEffect} from 'react';
import {useImages} from '../../Utils/Images';
import moment from 'moment';
import storage from '@react-native-firebase/storage';
import ImageViewer from 'react-native-image-zoom-viewer';
import AsyncStorage from '@react-native-async-storage/async-storage';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Chat = ({route, theme, addNotificationAction, userDetail}) => {
  const [inputValue, setInputValue] = useState('');
  const [preview, setPreview] = useState(false);
  const [assets, setAssets] = useState([]);
  const [linkOpen, setLinkOpen] = useState(false);
  const [state, setState] = useState({
    listHeight: 0,
    scrollViewHeight: 0,
    uploading: false,
    messages: [],
    messageText: '',
    messageData: null,
  });
  const {images} = useImages();
  const navigation = useNavigation();
  const styles = getStyles(theme);
  const {messageData} = state;

  const {messageuid} = route?.params;

  const handleChange = (key, value) => {
    setState(pre => ({...pre, [key]: value}));
  };

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async response => {
        if (!response.path) {
          handleChange('uploading', false);
        } else {
          const uri = response.path;
          const filename = Date.now();
          const uploadUri =
            Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          const task = storage()
            .ref('Chat/' + filename)
            .putFile(uploadUri);
          // set progress state
          task.on('state_changed', snapshot => {});
          try {
            const durl = await task;
            task.snapshot.ref.getDownloadURL().then(downloadURL => {
              handleSendMessage(downloadURL, 'image');
            });
          } catch (e) {
            console.error(e);
          }
          handleChange('uploading', false);
        }
      })
      .catch(err => {
        handleChange('showAlert', false);
        handleChange('uploading', false);
      });
  };

  const openGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async response => {
        if (!response.path) {
          handleChange('uploading', false);
        } else {
          const uri = response.path;
          const filename = Date.now();
          const uploadUri =
            Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
          const task = storage()
            .ref('Chat/' + filename)
            .putFile(uploadUri);
          task.on('state_changed', snapshot => {});
          try {
            await task;
            task.snapshot.ref.getDownloadURL().then(downloadURL => {
              handleSendMessage(downloadURL, 'image');
            });
          } catch (e) {
            console.error(e);
          }
          handleChange('uploading', false);
        }
      })
      .catch(err => {
        handleChange('showAlert', false);
        handleChange('uploading', false);
      });
  };

  const openDocument = async () => {
    pick({
      type: [types.pdf, types.docx],
    })
      .then(async response => {
        const uri = response[0].uri;
        const filename = response[0].name;
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const task = storage()
          .ref('Chat/' + filename)
          .putFile(uploadUri);
        task.on('state_changed', snapshot => {});
        try {
          await task;
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            handleSendMessage(downloadURL, 'document');
          });
        } catch (e) {
          console.error(e);
        }
        handleChange('uploading', false);
      })
      .catch(err => {
        handleChange('showAlert', false);
        handleChange('uploading', false);
      });
  };

  const toggleAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLinkOpen(!linkOpen);
  };

  let scrollView;
  const downButtonHandler = () => {
    if (scrollView !== null) {
      scrollView.scrollToEnd !== null &&
        scrollView.scrollToEnd({animated: true});
    }
  };
  useEffect(() => {
    if (scrollView !== null) {
      downButtonHandler();
    }
  });

  const handleSendMessage = async (text, type) => {
    setLinkOpen(false);
    const fcmToken = await AsyncStorage.getItem('FCMToken');
    if (inputValue.trim() || text) {
      const data = {
        text: inputValue || text,
        timeStamp: Date.now(),
        type: type || 'text',
        senderId: userDetail?.id,
      };
      let messages = state.messages.concat(data);
      const values = {
        messages,
        senderRead:
          state?.messageData?.senderRead > 0
            ? Number(state.messageData.senderRead) + 1
            : 1,
        receiverRead:
          state?.messageData?.receiverRead > 0
            ? Number(state.messageData.receiverRead) + 1
            : 1,
      };

      database()
        .ref('Messages/' + messageuid)
        .update(values)
        .then(res => {
          setState(prevState => ({
            ...prevState,
            loading: false,
            messageText: '',
          }));
          downButtonHandler();
        })
        .then(() => {
          const notificationData = {
            access_token:
              'ya29.a0AXooCgsv-PRP4v_DeLNO1Qwdg6BLEALbb-Wq4QcxZ7mHnDS2hHQvLHUttS9RqnGCUGeooZeOZHnBh2gntuJAqYdTPhKz64vsiXx9LphvJ7RnRGZb7WUpjIT8uOwTReSeIHM7w9-OHX89tIZKb2I-r39iAhhGnA2fNoClaCgYKATUSARESFQHGX2MiKvvdSQUYP58Kweo7AkY-Cg0171',
            title: userDetail?.name,
            message: inputValue || 'Sent a Photo',
            receiver: messageData?.receiver?.id,
            sender: userDetail?.id,
          };
          addNotificationAction(notificationData);
        })
        .catch(err => {
          console.log(err);
          Toast.show('Something went wrong!', Toast.LONG);
        });
      setInputValue('');
    }
  };

  const deleteMessage = async messageId => {
    try {
      await database()
        .ref(`Messages/${messageuid}/messages/${messageId}`)
        .remove();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleConfirmDelete = id => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [{text: 'Cancel'}, {text: 'Yes', onPress: () => deleteMessage(id)}],
    );
  };

  const getProfileImage = () => {
    const isSender = messageData?.senderId === userDetail?.id;
    const profileImage = isSender
      ? messageData?.receiver?.profile_image
      : messageData?.sender?.profile_image;

    return profileImage ? {uri: profileImage} : images.profile;
  };

  const imageList = assets?.map(({uri, image}) => ({
    url: uri ? uri : image,
  }));
  useEffect(() => {
    const db = database();
    if (userDetail && messageuid) {
      db.ref('Messages/' + messageuid).on('value', snapshot => {
        if (snapshot.val()) {
          if (snapshot.val()?.senderId === userDetail?.id) {
            db.ref('Messages/' + messageuid)
              .update({senderRead: 0})
              .then(res => {
                db.ref('Messages/' + messageuid).once('value', snapshot => {
                  if (snapshot.val()) {
                    console.log({
                      msgs: JSON.stringify(snapshot.val().messages),
                    });
                    setState(prevState => ({
                      ...prevState,
                      messages: snapshot.val().messages || [],
                      messageData: snapshot.val(),
                    }));
                  }
                });
              });
          }
          if (snapshot.val()?.receiverId === userDetail?.id) {
            db.ref('Messages/' + messageuid)
              .update({receiverRead: 0})
              .then(res => {
                db.ref('Messages/' + messageuid).once('value', snapshot => {
                  if (snapshot.val()) {
                    setState(prevState => ({
                      ...prevState,
                      messages: snapshot.val()?.messages || [],
                      messageData: snapshot.val(),
                    }));
                  }
                });
              });
          }
        }
      });
    }
  }, [userDetail]);

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
            <Image
              source={getProfileImage()}
              style={{
                width: 37,
                height: 36,
                borderRadius: 30,
              }}
            />
          </View>
          <Text style={styles.userName}>
            {messageData
              ? messageData?.senderId === userDetail?.id
                ? messageData?.receiver?.name
                : messageData?.sender?.name
              : ''}
          </Text>
        </View>
      </View>

      <FlatList
        data={state?.messages}
        keyboardDismissMode="on-drag"
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          setState(prevState => ({
            ...prevState,
            listHeight: contentHeight,
          }));
        }}
        onLayout={e => {
          const height = e.nativeEvent.layout.height;
          setState(prevState => ({
            ...prevState,
            scrollViewHeight: height,
          }));
        }}
        ref={ref => {
          scrollView = ref;
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={({item, index}) => {
          if (item == null) {
            return <View />;
          } else if (item?.senderId !== userDetail?.id) {
            return (
              <View
                key={index}
                style={{
                  width: '100%',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingBottom: 10,
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={{
                      width: 40,
                      borderRadius: 20,
                      height: 40,
                      marginRight: 10,
                    }}
                    resizeMode="cover"
                    source={
                      messageData?.senderId === userDetail?.id
                        ? messageData?.receiver?.profile_image
                          ? {
                              uri: messageData?.receiver?.profile_image,
                            }
                          : images.profile
                        : messageData?.sender?.profile_image
                        ? {
                            uri: messageData?.sender?.profile_image,
                          }
                        : images.profile
                    }
                  />

                  {item?.type === 'image' ? (
                    <View
                      style={{
                        borderRadius: 10,
                        padding: 5,
                        backgroundColor: inputBackground,
                      }}>
                      <Image
                        source={{uri: item?.text}}
                        style={{
                          width: 250,
                          height: 200,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor: headerBackgroundColor,
                        maxWidth: '90%',
                        borderRadius: 10,
                        paddingLeft: 10,
                        paddingHorizontal: 30,
                      }}>
                      <Text
                        style={{
                          textAlign: 'left',
                          color: 'white',
                        }}>
                        {item?.text}
                      </Text>

                      <View
                        style={{
                          width: '130%',
                          alignItems: 'flex-end',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 10,
                            marginHorizontal: 5,
                            marginTop: -5,
                          }}>
                          {moment(item?.timeStamp).format('h:mm a')}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          } else {
            return (
              <Pressable
                onLongPress={() => handleConfirmDelete(index)}
                key={index}
                style={styles.sentTextHeader}>
                <View
                  style={{
                    width: '95%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    paddingBottom: 10,
                  }}>
                  {item?.type === 'image' ? (
                    <View
                      style={{
                        borderRadius: 10,
                        padding: 5,
                        backgroundColor: inputBackground,
                      }}>
                      <Image
                        source={{uri: item?.text}}
                        style={{
                          width: 250,
                          height: 200,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor: inputBackground,
                        maxWidth: '85%',
                        alignItems: 'flex-end',
                        borderRadius: 10,
                        borderBottomRightRadius: 0,
                        padding: 10,
                      }}>
                      <Text style={{color: textColor}}>{item?.text}</Text>
                      <Text
                        style={{
                          color: textColor,
                          fontSize: 12,
                          marginTop: -5,
                        }}>
                        {moment(item?.timeStamp).format('h:mm a')}
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          }
        }}
      />

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
          onPress={() => (state.messages ? handleSendMessage() : console(''))}>
          <MaterialCommunityIcons
            size={25}
            color={textColor}
            name={inputValue == '' ? 'microphone' : 'send'}
          />
        </Pressable>
      </View>

      <Modal visible={preview}>
        <ImageViewer
          imageUrls={imageList}
          onCancel={() => setPreview(false)}
          renderHeader={() => (
            <TouchableOpacity
              onPress={() => setPreview(false)}
              style={{
                marginHorizontal: 10,
                marginVertical: 10,
                marginTop: Platform.OS == 'ios' ? 50 : 0,
                width: 30,
                height: 33,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Image
                source={language == 'ar' ? Images.forward : Images.backArrow}
                style={styles.backArrowImage}
              /> */}
            </TouchableOpacity>
          )}
          renderImage={({source}) => (
            <Image
              source={{uri: source.uri}}
              style={{
                bottom: Platform.OS == 'ios' ? 50 : 0,
                width: '100%',
                height: '100%',
              }}
            />
          )}
          backgroundColor="black"
        />
      </Modal>
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
