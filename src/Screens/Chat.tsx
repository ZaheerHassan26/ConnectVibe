import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCropPicker from 'react-native-image-crop-picker';

interface Props {
  route: {
    params: {
      data: any;
    };
  };
}
export default function Chat({route}: Props) {
  const [inputValue, setInputValue] = useState('');
  const [attachment, setAttachment] = useState<Object>({});

  const navigation = useNavigation();
  const scrollRef = useRef();

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
        <View style={styles.imagediv}>
          <View style={styles.imageContainer}>
            {data?.image == null ? (
              <Text
                style={{
                  color: 'green',
                  fontSize: 17,
                  alignSelf: 'center',
                }}>
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
          <Text style={{color: 'white', fontSize: 18, alignSelf: 'center'}}>
            {data?.name}
          </Text>
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
              placeholderTextColor="#080F18"
              placeholder="Type here..."
              style={styles.inputText}
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Entypo size={25} color={'#10445C'} name={'link'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <Entypo size={25} color={'#10445C'} name={'camera'} />
            </TouchableOpacity>
          </View>
        </View>
        <Pressable style={styles.sendbtn}>
          <MaterialCommunityIcons
            size={25}
            color={'#10445C'}
            name={inputValue == '' ? 'microphone' : 'send'}
          />
        </Pressable>
      </View>
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
    gap: 10,
    borderBottomRightRadius: 26,
    borderBottomLeftRadius: 26,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    paddingBottom: 20,
    flexDirection: 'row',
  },
  imagediv: {
    flexDirection: 'row',
    gap: 7,
    top: 5,
    justifyContent: 'center',
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
  chatMainHeader: {
    marginHorizontal: 24,
  },
  inputInnerContainer: {
    backgroundColor: '#CBDFE8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 26,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  leftInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    minHeight: 50,
    marginRight: 10,
    flexBasis: '60%',
  },
  iconContainer: {
    flexDirection: 'row',
    flexBasis: '20%',
    justifyContent: 'space-between',
  },
  sendbtn: {
    backgroundColor: '#CBDFE8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});
