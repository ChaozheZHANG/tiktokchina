import React, { useState } from 'react';
import {
  Image,
  Animated,
  Easing,
  Modal,
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';

import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Lottie from 'lottie-react-native';

import musicFly from '../../../assets/lottie-animations/music-fly.json';

import {
  Container,
  Details,
  Actions,
  User,
  Tags,
  Music,
  MusicBox,
  BoxAction,
  TextAction,
} from './styles';
import {
  Product,
  useShoppingCartStore,
  useUserEventLogStore,
  useUserStore,
  useWalletStore,
} from '../../../stores';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

interface Item {
  id: number;
  username: string;
  tags: string;
  music: string;
  likes: number;
  comments: number;
  uri: string;
}

interface Props {
  play: boolean;
  product: Product;
  item: Item;
  navigation: any;
}

const Feed: React.FC<Props> = ({ play, product, item, navigation }) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const rotateProp = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const { user } = useUserStore();
  const { addEventLog } = useUserEventLogStore();
  const { products, addProduct } = useShoppingCartStore();
  const { removeMoney } = useWalletStore();

  const [modalVisible, setModalVisible] = useState(false);

  const handleBuy = (): void => {
    console.log('Buy button clicked');
    if (products.includes(product)) {
      setModalVisible(!modalVisible);
    } else {
      addEventLog({
        id: '1',
        event: 'buy',
        userId: user.id,
        productId: `${product.id}`,
        timestamp: Date.now(),
      });
      if (user.condition === '2' || user.condition === '3') {
        navigation.navigate('ProductDetail', { product });
      } else {
        addProduct(product);
        removeMoney(product.price);
        navigation.navigate('Purchase');
      }
    }
  };

  return (
    <>
      <LinearGradient
        colors={['rgba(0,0,0,.3)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '70%',
        }}
      />
      <Container>
        <Video
          source={{ uri: item.uri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={play}
          isLooping
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Already in Shopping Cart</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Back</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Container>
      <Details>
        <User>{item.username}</User>
        <Tags>{item.tags}</Tags>
        <Tags>${product.price}</Tags>
        <MusicBox>
          <FontAwesome name="music" size={15} color="#f5f5f5" />
          <Music>{item.music}</Music>
        </MusicBox>
      </Details>
      <Actions>
        <BoxAction
          onPress={() => {
            console.log('shop');
            handleBuy();
          }}
        >
          <FontAwesome
            style={{ alignSelf: 'center' }}
            name="shopping-cart"
            size={35}
            color="#fff"
          />
          <TextAction>Shop</TextAction>
        </BoxAction>
        <BoxAction>
          <AntDesign
            style={{ alignSelf: 'center' }}
            name="heart"
            size={35}
            color="#fff"
          />
          <TextAction>{item.likes}</TextAction>
        </BoxAction>
        <BoxAction>
          <FontAwesome
            style={{ alignSelf: 'center' }}
            name="commenting"
            size={35}
            color="#fff"
          />
          <TextAction>{item.comments}</TextAction>
        </BoxAction>
        <BoxAction>
          <Animated.View>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
              }}
              source={{
                uri:
                  'https://img1.baidu.com/it/u=2787072759,2468608291&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
              }}
            />
          </Animated.View>

          <Lottie
            source={musicFly}
            progress={play ? spinValue : 0}
            style={{ width: 150, position: 'absolute', bottom: 0, right: 0 }}
          />
        </BoxAction>
      </Actions>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,.4)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '50%',
        }}
      />
    </>
  );
};

export default Feed;
