import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import Logout from '../../Components/LogoutModal';
import {useImages} from '../../Utils/Images';
import {getStyles} from './style';
import {connect} from 'react-redux';
import {setTheme, toggleTheme} from '../ThemeProvider/redux/action';

const Setting = ({onSelectTheme, theme, toggle_theme, isDark}) => {
  const [isLogOutModelVisible, setIsLogOutModalVisible] = useState(false);
  const {images} = useImages();
  const styles = getStyles(theme);

  const data = [
    {
      image: images.power,
      text: 'Logout',
      onclick: () => {
        setIsLogOutModalVisible(true);
      },
    },
  ];
  const handleToggle = () => {
    toggle_theme();
    isDark ? onSelectTheme('default') : onSelectTheme('dark');
  };
console.log(isDark,'dark');
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
    <SafeAreaView style={styles.container}>
      <View style={styles.moreMainView}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        <View style={{flexDirection: 'row'}}>
          <Text>dark mode</Text>
          <Switch value={isDark} onChange={handleToggle} />
        </View>
      </View>
      <Logout
        setIsLogOutModalVisible={setIsLogOutModalVisible}
        isLogOutModelVisible={isLogOutModelVisible}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
  isDark: state?.themes?.isDark,
});
const mapDispatchToProps = dispatch => ({
  onSelectTheme: theme => dispatch(setTheme(theme)),
  toggle_theme: () => dispatch(toggleTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
