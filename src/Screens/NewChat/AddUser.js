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

import {useThemeColor} from '../ThemeProvider/redux/saga';
import {getUser as getUserAction} from './redux/action';
import styles from './style';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from 'react-native';

const height = Dimensions.get('window').height;

const AddUser = ({navigation, getUserAction, users, loading}) => {
  const [searchName, setSearchName] = useState('');

  const handleSearch = val => {
    setSearchName(val);
  };

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
        ) : (
          <FlatList
            data={searchName == '' ? [] : users}
            renderItem={({item, index}) => (
              <>
                <TouchableOpacity
                  style={styles.chatContainer}
                  onPress={() => navigation.navigate('chat', {data: item})}>
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
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
  users: state?.searchUser?.profile,
  loading: state?.searchUser?.requesting,
});

const mapDispatchToProps = dispatch => ({
  getUserAction: data => dispatch(getUserAction(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
