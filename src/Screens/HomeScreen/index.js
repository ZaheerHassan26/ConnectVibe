import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {useEffect} from 'react';
import {useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {useImages} from '../../Utils/Images';
import {getUser as getUserAction} from '../NewChat/redux/action';
import {getStyles} from './style';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import AddButton from '../../Components/AddButton';
import database from '@react-native-firebase/database';
import moment from 'moment';

const Home = ({userDetail, navigation}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isActive, setIsActive] = useState('');
  const [state, setState] = useState({
    loading: false,
    List: [],
    allList: [],
    unread: [],
    searchText: '',
  });

  const {loading, allList, unread, List, searchText} = state;
  const translateX = useRef(new Animated.Value(0)).current;

  const {images} = useImages();
  const isFocused = useIsFocused();
  const styles = getStyles();

  const handleChange = (key, value) => {
    setState(pre => ({...pre, [key]: value}));
  };

  const snapshotToArray = snapshot =>
    Object.entries(snapshot).map(e => Object.assign(e[1], {uid: e[0]}));

  const unreadList = messages => {
    const unread = messages?.filter(
      item =>
        (item?.receiverId === userDetail?.id && item?.receiverRead > 0) ||
        (item?.senderId === userDetail?.id && item?.senderRead > 0),
    );
    handleChange('unread', unread);
  };
  const sortByDate = data => {
    return data?.sort(function (a, b) {
      return (
        new Date(
          b?.messages && b?.messages?.length > 0
            ? b?.messages[b?.messages?.length - 1]?.timeStamp
            : b?.timeStamp,
        ) -
        new Date(
          a?.messages && a?.messages?.length > 0
            ? a?.messages[a?.messages?.length - 1]?.timeStamp
            : a?.timeStamp,
        )
      );
    });
  };

  const sortByUser = data => {
    return data?.filter(
      item =>
        item?.senderId === userDetail?.id ||
        item?.receiverId === userDetail?.id,
    );
  };

  const getMessages = async () => {
    try {
      handleChange('loading', true);
      database()
        .ref(`Messages`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            const messages = snapshotToArray(snapshot.val());
            handleChange('allList', messages);
            unreadList(messages);
            handleChange('loading', false);
            handleChange('List', messages);
          } else {
            handleChange('loading', false);
          }
        });
    } catch (error) {
      handleChange('loading', false);
    }
  };

  const filtered = (key, value) => {
    handleChange(key, value);

    if (value) {
      const searchValue = value.toLowerCase();

      const filteredList = allList?.filter(entry => {
        if (entry?.type === 'group') {
          return entry?.name?.toLowerCase().includes(searchValue);
        }

        const targetName =
          entry?.senderId !== userDetail?.id
            ? entry?.sender?.name
            : entry?.receiver?.name;

        return targetName?.toLowerCase().includes(searchValue);
      });

      handleChange('List', filteredList);
    } else {
      handleChange('List', allList);
    }
  };

  useEffect(() => {
    if (isSearchActive) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {});
    }
  }, [isSearchActive]);

  useEffect(() => {
    setIsActive('All');
    const focusListener = navigation.addListener('focus', getMessages);
    const blurListener = navigation.addListener('blur', () => {
      handleChange('List', []);
      handleChange('allList', []);
    });
    return () => {
      focusListener();
      blurListener();
    };
  }, [navigation]);

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');
  const searchBar = useThemeColor('activeTab');
  const placeholderColor = useThemeColor('placeholder');

  const group = List?.filter(item => item.type == 'group');
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      <StatusBar
        animated={true}
        backgroundColor={headerBackgroundColor}
        barStyle={'light-content'}
      />

      <View style={[styles.header, {backgroundColor: headerBackgroundColor}]}>
        {!isSearchActive ? (
          <>
            <Text style={styles.headerText}>Connect Vibe</Text>
            <Pressable onPress={() => setIsSearchActive(true)}>
              <EvilIcons size={28} color={'white'} name={'search'} />
            </Pressable>
          </>
        ) : (
          <Animated.View
            style={[
              styles.searchContainer,
              {transform: [{translateX}], backgroundColor: searchBar},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  setIsSearchActive(false),
                    handleChange('searchText', ''),
                    handleChange('List', allList);
                }}
                style={{marginHorizontal: 5}}>
                <Ionicons size={20} color={'white'} name={'arrow-back'} />
              </Pressable>
              <TextInput
                value={searchText}
                placeholderTextColor={placeholderColor}
                placeholder="search"
                style={{width: '80%', color: 'white', textAlign: 'left'}}
                onChangeText={value => filtered('searchText', value)}
              />
            </View>
          </Animated.View>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: 150,
          justifyContent: 'space-between',
          marginTop: 10,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            width: 50,
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,
          }}
          onPress={() => setIsActive('All')}>
          <Text>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 10,

            width: 50,
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setIsActive('Groups')}>
          <Text>Groups</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{marginVertical: '50%'}}>
          <ActivityIndicator size="small" color={textColor} />
        </View>
      ) : isActive == 'All' ? (
        <FlatList
          data={sortByUser(sortByDate(List))}
          numColumns={1}
          style={{width: '100%'}}
          noIndent={true}
          keyExtractor={item => item?.timeStamp}
          ListEmptyComponent={() => (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 20,
                  color: textColor,
                }}>
                You have no messages
              </Text>
            </View>
          )}
          renderItem={({item, index}) => {
            const lastMessage =
              item?.messages &&
              Array.isArray(item.messages) &&
              item.messages.length > 0
                ? item.messages[item.messages.length - 1]
                : null;

            const messagePreview = lastMessage
              ? lastMessage.type === 'image'
                ? 'Sent a photo'
                : lastMessage.text.length > 30
                ? lastMessage.text.slice(0, 30) + ' ....'
                : lastMessage.text
              : '';
            return (
              <>
                <TouchableOpacity
                  style={styles.chatContainer}
                  onPress={() => {
                    if (item?.type === 'group') {
                      navigation.navigate('GroupChat', {
                        messageuid: item.id,
                      });
                    } else {
                      navigation.navigate('Chat', {
                        messageuid: item?.id,
                        data: item,
                      });
                    }
                  }}>
                  <View style={[styles.imageContainer]}>
                    <Image
                      source={
                        item?.type === 'group'
                          ? images.profile
                          : item?.senderId === userDetail?.id
                          ? item?.sender?.profile_image
                            ? {uri: item?.sender?.profile_image}
                            : images.profile
                          : item?.receiver?.profile_image
                      }
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textContainer} key={index}>
                    <View style={{marginLeft: 10}}>
                      <Text style={[styles.userName, {color: textColor}]}>
                        {item?.type === 'group'
                          ? item?.name
                          : item?.senderId === userDetail?.id
                          ? item?.receiver?.name
                          : item?.sender?.name}
                      </Text>
                      <Text
                        style={[styles.message, {color: textColor}]}
                        numberOfLines={1}>
                        {messagePreview}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.dateView}>
                    <Text style={styles.date}>
                      {Array.isArray(item?.messages) &&
                        item.messages.length > 0 &&
                        moment(
                          item.messages[item.messages.length - 1]?.timeStamp,
                        )
                          .fromNow()
                          .slice(0, 15)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
        />
      ) : (
        <FlatList
          data={sortByUser(sortByDate(group))}
          numColumns={1}
          style={{width: '100%'}}
          noIndent={true}
          keyExtractor={item => item?.timeStamp}
          ListEmptyComponent={() => (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 20,
                  color: textColor,
                }}>
                You have no messages
              </Text>
            </View>
          )}
          renderItem={({item, index}) => {
            const lastMessage =
              item?.messages &&
              Array.isArray(item.messages) &&
              item.messages.length > 0
                ? item.messages[item.messages.length - 1]
                : null;

            const messagePreview = lastMessage
              ? lastMessage.type === 'image'
                ? 'Sent a photo'
                : lastMessage.text.length > 30
                ? lastMessage.text.slice(0, 30) + ' ....'
                : lastMessage.text
              : '';
            return (
              <>
                <TouchableOpacity
                  style={styles.chatContainer}
                  onPress={() => {
                    navigation.navigate('GroupChat', {
                      messageuid: item.id,
                      data: item,
                    });
                  }}>
                  <View style={[styles.imageContainer]}>
                    <Image
                      source={
                        item?.type == 'group'
                          ? images.profile
                          : item?.senderId === userDetail?.id
                          ? item?.sender?.profile_image
                            ? {uri: item?.sender?.profile_image}
                            : images.profile
                          : {uri: item?.receiver?.profile_image}
                      }
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textContainer} key={index}>
                    <View style={{marginLeft: 10}}>
                      <Text style={[styles.userName, {color: textColor}]}>
                        {item?.type === 'group'
                          ? item?.name
                          : item?.senderId === userDetail?.id
                          ? item?.receiver?.name
                          : item?.sender?.name}
                      </Text>
                      <Text
                        style={[styles.message, {color: textColor}]}
                        numberOfLines={1}>
                        {messagePreview}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.dateView}>
                    <Text style={styles.date}>
                      {Array.isArray(item?.messages) &&
                        item.messages.length > 0 &&
                        moment(
                          item.messages[item.messages.length - 1]?.timeStamp,
                        )
                          .fromNow()
                          .slice(0, 15)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
        />
      )}

      <AddButton />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userDetail: state?.login?.userDetail?.user,
  userSearched: state?.searchUser?.profile,
});

const mapDispatchToProps = dispatch => ({
  getProfileAction: data => dispatch(getProfileAction(data)),
  getUserAction: data => dispatch(getUserAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
