import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {getStyles} from './style';
import {getThemeColor} from '../ThemeProvider/redux/saga';

const Chat = ({route, theme}) => {
  const [inputValue, setInputValue] = useState('');
  const [attachment, setAttachment] = useState({});

  const navigation = useNavigation();
  const scrollRef = useRef();
  const styles = getStyles(theme);

  const {data} = route?.params;
  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setAttachment(image);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons size={25} color={'white'} name={'arrow-back'} />
        </TouchableOpacity>
        <View style={styles.imageDiv}>
          <View style={styles.imageContainer}>
            {data?.image == null ? (
              <Text style={styles.imgText}>
                {`${data?.name[0]?.toUpperCase()}`}
              </Text>
            ) : (
              <Image
                source={data?.image}
                style={{
                  width: 37,
                  height: 36,
                  borderRadius: 30,
                }}
              />
            )}
          </View>
          <Text style={styles.userName}>{data?.name}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.chatMainHeader}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}>
        <View style={{paddingTop: 45}}></View>
      </ScrollView>

      <View style={{flexDirection: 'row'}}>
        <View style={styles.inputInnerContainer}>
          <View style={styles.leftInputView}>
            <TextInput
              placeholderTextColor={getThemeColor('placeholder', theme)}
              placeholder="Type here..."
              style={styles.inputText}
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Entypo size={25} color={getThemeColor('text', theme)} name={'link'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <Entypo size={25} color={getThemeColor('text', theme)} name={'camera'} />
            </TouchableOpacity>
          </View>
        </View>
        <Pressable style={styles.sendBtn}>
          <MaterialCommunityIcons
            size={25}
            color={getThemeColor('text', theme)}
            name={inputValue == '' ? 'microphone' : 'send'}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  theme: state?.themes?.theme,
});

export default connect(mapStateToProps, null)(Chat);
