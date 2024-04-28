import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useImages} from '../Utils/Images';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const {images} = useImages();

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
                    <Text style={{color: '#10445C'}} numberOfLines={1}>
                      {'dkafkj' ?? 'null'}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF4F6',
  },
  header: {
    backgroundColor: '#10445C',
    height: 80,
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    paddingBottom: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  imageContainer: {
    backgroundColor: 'white',
    width: 42,
    height: 42,
    marginHorizontal: 3,
    borderRadius: 30,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  chatContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
  },
  imgText: {
    color: 'green',
    fontSize: 17,
    alignSelf: 'center',
  },
  image: {
    width: 37,
    height: 36,
    alignSelf: 'center',
    borderRadius: 30,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
    borderRadius: 30,
  },
  userName: {color: '#10445C', fontSize: 16},
  dateView: {justifyContent: 'flex-end', right: 10},
  date: {color: 'grey', fontSize: 12},
});
