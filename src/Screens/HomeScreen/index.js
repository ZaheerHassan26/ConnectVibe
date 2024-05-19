import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useImages} from '../../Utils/Images';
import {useIsFocused} from '@react-navigation/native';
import {getProfile as getProfileAction} from '../EditProfileScreen/redux/actions';
import {getStyles} from './style';
import {connect} from 'react-redux';
import {useEffect} from 'react';

const Home = ({userDetail, navigation, getProfileAction, theme}) => {
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

  useEffect(() => {
    const data = {
      id: userDetail?.id,
    };
    getProfileAction(data);
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'#10445C'}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Connect Vibe</Text>
        <Pressable>
          {/* <EvilIcons size={28} color={'white'} name={'search'} /> */}
        </Pressable>
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
