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
import {connect} from 'react-redux';
import {useEffect} from 'react';
import {useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {useImages} from '../../Utils/Images';
import {getProfile as getProfileAction} from '../EditProfileScreen/redux/actions';
import {getStyles} from './style';
import {useThemeColor} from '../ThemeProvider/redux/saga';
import AddButton from '../../Components/AddButton';

const Home = ({userDetail, navigation, getProfileAction}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const translateX = useRef(new Animated.Value(0)).current;

  const {images} = useImages();
  const isFocused = useIsFocused();
  const styles = getStyles();

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
    const newFilteredData = dummyData.filter(item => {
      return item.name.toLowerCase().includes(searchName.toLowerCase());
    });
    setFilteredData(newFilteredData);
  }, [searchName, isFocused]);

  const backgroundColor = useThemeColor('primary');
  const textColor = useThemeColor('text');
  const headerBackgroundColor = useThemeColor('headerColor');
  const imageBackground = useThemeColor('black');
  const searchBar = useThemeColor('activeTab');
  const placeholderColor = useThemeColor('placeholder');

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
                  setIsSearchActive(false), setSearchName('');
                }}
                style={{marginHorizontal: 5}}>
                <Ionicons size={20} color={'white'} name={'arrow-back'} />
              </Pressable>
              <TextInput
                value={searchName}
                placeholderTextColor={placeholderColor}
                placeholder="search"
                style={{width: '80%', color: 'white', textAlign: 'left'}}
                onChangeText={handleSearch}
              />
            </View>
          </Animated.View>
        )}
      </View>

      <FlatList
        data={filteredData || []}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                style={styles.chatContainer}
                onPress={() => navigation.navigate('chat', {data: item})}>
                <View
                  style={[
                    styles.imageContainer,
                    {backgroundColor: imageBackground},
                  ]}>
                  {item?.image == null ? (
                    <Text style={[styles.imgText, {color: backgroundColor}]}>
                      {`${item?.name[0]?.toUpperCase()}`}
                    </Text>
                  ) : (
                    <Image source={item?.image} style={styles.image} />
                  )}
                </View>
                <View style={styles.textContainer} key={index}>
                  <View style={{marginLeft: 10}}>
                    <Text style={[styles.userName, {color: textColor}]}>
                      {item?.name}
                    </Text>
                    <Text
                      style={[styles.message, {color: textColor}]}
                      numberOfLines={1}>
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
      <AddButton />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  userDetail: state?.login?.userDetail?.user,
});

const mapDispatchToProps = dispatch => ({
  getProfileAction: data => dispatch(getProfileAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
