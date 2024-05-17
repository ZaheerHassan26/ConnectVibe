import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Logout from '../../Components/LogoutModal';
import {useImages} from '../../Utils/Images';
import styles from './style';

export default function Setting() {
  const [isLogOutModelVisible, setIsLogOutModalVisible] = useState(false);
  const {images} = useImages();

  const data = [
    {
      image: images.power,
      text: 'Logout',
      onclick: () => {
        setIsLogOutModalVisible(true);
      },
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={
        () =>
          item.navigate
            ? navigation.navigate(item.navigate)
            : item.onclick
            ? item.onclick()
            : ''
        //  navigation.navigate(item.navigate)
      }
      style={styles.bottomItemView}>
      <View style={styles.leftBottomView}>
        <TouchableOpacity
          style={{
            backgroundColor: '#F0F0F0',
            padding: 11,
            borderRadius: 10,
          }}>
          <Image
            source={item.image}
            style={{width: 14.5, height: 16.31}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.bottomText}>{item.text}</Text>
      </View>
      <TouchableOpacity style={styles.rightBottomView}>
        <Image
          source={images.rightArrow}
          style={{
            width: 8.22,
            height: 14,
          }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <View style={styles.moreMainView}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Logout
        setIsLogOutModalVisible={setIsLogOutModalVisible}
        isLogOutModelVisible={isLogOutModelVisible}
      />
    </SafeAreaView>
  );
}
