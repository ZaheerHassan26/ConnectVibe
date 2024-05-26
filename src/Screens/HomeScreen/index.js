import {
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
import Entypo from 'react-native-vector-icons/Entypo';

import {useImages} from '../../Utils/Images';
import {useIsFocused} from '@react-navigation/native';
import {getProfile as getProfileAction} from '../EditProfileScreen/redux/actions';
import {getStyles} from './style';
import {connect} from 'react-redux';
import {useEffect} from 'react';
import {useRef} from 'react';

const Home = ({userDetail, navigation, getProfileAction, theme}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchName, setSearchName] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const {images} = useImages();
  const isFocused = useIsFocused();
  const styles = getStyles(theme);

  const dummyData = [
    {
      name: 'Zaheer Hassan',
      image: images.profile,
    },
    {
      name: 'Hassan',
      image: null,
    },
    {
      name: 'Zaheer Hassan',
      image: images.profile,
    },
  ];

  const handleSearch = val => {
    setSearchName(val);
  };

  useEffect(() => {
    const data = {
      id: userDetail?.id,
    };
    getProfileAction(data);
  }, [isFocused]);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={styles.header.backgroundColor}
        barStyle={'light-content'}
      />

      <View style={styles.header}>
        {!isSearchActive ? (
          <>
            <Text style={styles.headerText}>Connect Vibe</Text>
            <Pressable onPress={() => setIsSearchActive(true)}>
              <EvilIcons size={28} color={'white'} name={'search'} />
            </Pressable>
          </>
        ) : (
          <Animated.View
            style={[styles.searchContainer, {transform: [{translateX}]}]}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => setIsSearchActive(false)}
                style={{marginHorizontal: 5}}>
                <Ionicons size={20} color={'white'} name={'arrow-back'} />
              </Pressable>
              <TextInput
                value={searchName}
                placeholder="search"
                style={{width: '80%', color: 'white', textAlign: 'left'}}
                onChangeText={handleSearch}
              />
            </View>
            {searchName !== '' && (
              <Pressable onPress={() => setSearchName('')}>
                <Entypo size={22} color={'white'} name={'cross'} />
              </Pressable>
            )}
          </Animated.View>
        )}
      </View>

      <FlatList
        data={dummyData}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                style={styles.chatContainer}
                onPress={() => navigation.navigate('chat', {data: item})}>
                <View style={styles.imageContainer}>
                  {item?.image == null ? (
                    <Text style={styles.imgText}>
                      {`${item?.name[0]?.toUpperCase()}`}
                    </Text>
                  ) : (
                    <Image source={item?.image} style={styles.image} />
                  )}
                </View>
                <View style={styles.textContainer} key={index}>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.userName}>{item?.name}</Text>
                    <Text style={styles.message} numberOfLines={1}>
                      {'hey' ?? 'null'}
                    </Text>
                  </View>
                </View>
                <View style={styles.dateView}>
                  <Text style={styles.date}>26/4/2020</Text>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userDetail: state?.login?.userDetail?.user,
  theme: state?.themes?.theme,
});

const mapDispatchToProps = dispatch => ({
  getProfileAction: data => dispatch(getProfileAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
