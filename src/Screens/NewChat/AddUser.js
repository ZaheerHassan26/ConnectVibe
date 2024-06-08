import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import {useThemeColor} from '../ThemeProvider/redux/saga';
import {getUser as getUserAction} from './redux/action';
import styles from './style';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from 'react-native';

const height = Dimensions.get('window').height;

const AddUser = ({
  navigation,
  getUserAction,
  userSearched,
  loading,
  userDetail,
}) => {
  const [searchName, setSearchName] = useState('');
  const [threads, setThreads] = useState([]);

  const handleSearch = val => {
    setSearchName(val);
  };

  const createAndNavigate = item => {
    let loggedUser = userDetail?.id;
    let secondUser = item?.id;

    const chatRoom = threads.find(el => {
      return (
        (el.user1 == loggedUser && el.user2 == secondUser) ||
        (el.user2 == loggedUser && el.user1 == secondUser)
      );
    });
    if (!chatRoom) {
      firestore()
        .collection('Chats')
        .add({
          user1: loggedUser,
          user2: secondUser,
        })
        .then(data => {
          navigation.navigate('chat', {
            roomID: data?._documentPath?._parts[1],
            data: item,
          });
        });
    } else {
      navigation.navigate('chat', {
        roomID: chatRoom?._id,
        data: item,
      });
    }
  };

  const getRooms = () => {
    firestore()
      .collection('Chats')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot._docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            ...documentSnapshot.data(),
          };
        });
        setThreads(threads);
      });
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (searchName !== '') {
      getUserAction(searchName);
    }
  }, [searchName]);

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');
  const imageBackground = useThemeColor('black');
  const placeholderColor = useThemeColor('placeholder');
  const searchBar = useThemeColor('activeTab');

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      <StatusBar
        animated={true}
        backgroundColor={headerBackgroundColor}
        barStyle={'light-content'}
      />
      <View style={[styles.header, {backgroundColor: headerBackgroundColor}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{justifyContent: 'center', height: 45}}>
          <Ionicons size={25} color={'white'} name={'arrow-back'} />
        </TouchableOpacity>

        <TextInput
          value={searchName}
          placeholderTextColor={placeholderColor}
          placeholder="search"
          style={[styles.searchContainer, {backgroundColor: searchBar}]}
          onChangeText={handleSearch}
        />
      </View>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 20,
          height: height - 110,
        }}>
        {loading ? (
          <View style={{marginVertical: '50%'}}>
            <ActivityIndicator color={textColor} size={'large'} />
          </View>
        ) : userSearched?.length ? (
          <FlatList
            data={searchName == '' ? [] : userSearched}
            renderItem={({item, index}) => (
              <>
                <TouchableOpacity
                  style={styles.chatContainer}
                  onPress={() => createAndNavigate(item)}>
                  <View
                    style={[
                      styles.imageContainer,
                      {backgroundColor: imageBackground},
                    ]}>
                    {item?.profile_image == null ? (
                      <Text style={[styles.imgText, {color: backgroundColor}]}>
                        {`${item?.name[0]?.toUpperCase()}`}
                      </Text>
                    ) : (
                      <Image
                        source={{uri: item?.profile_image}}
                        style={styles.image}
                      />
                    )}
                  </View>
                  <View style={styles.textContainer} key={index}>
                    <View style={{marginLeft: 10}}>
                      <Text style={[styles.userName, {color: textColor}]}>
                        {item?.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: '50%',
            }}>
            <Text style={{color: textColor}}>No user Found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
  userSearched: state?.searchUser?.profile,
  loading: state?.searchUser?.requesting,
  userDetail: state?.login?.userDetail?.user,
});

const mapDispatchToProps = dispatch => ({
  getUserAction: data => dispatch(getUserAction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
