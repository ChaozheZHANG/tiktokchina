import React, { useEffect } from 'react';
import { Button, FlatList, ScrollView, Text, View } from 'react-native';

import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

import avatar from '../../assets/avatar.png';

import {
  Container,
  Title,
  Header,
  Avatar,
  Username,
  Content,
  Stats,
  Separator,
  StatsText,
  StatsColumn,
  StatsNumber,
  ProfileColumn,
  ProfileEdit,
  ProfileText,
  Bookmark,
} from './styles';
import ShoppingWindow from '../../components/ShoppingWindow';
import ShoppingCartItem from '../../components/ShoppingCartItem';
import {
  useShoppingCartStore,
  useUserEventLogStore,
  useUserStore,
} from '../../stores';

const ShoppingCart: React.FC = ({ navigation }) => {
  const { products } = useShoppingCartStore();
  const { addEventLog } = useUserEventLogStore();
  const { user } = useUserStore();

  useEffect(() => {
    console.log('ShoppingCart mounted');

    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      console.log('ShoppingCart focused');

      addEventLog({
        id: '1',
        event: 'viewShoppingCartPage',
        userId: user.id,
        timestamp: Date.now(),
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header>
        {/* <AntDesign
          style={{ position: 'absolute', left: 10, top: 10 }}
          name="adduser"
          size={24}
          color="black"
        /> */}
        <Title>Shopping Cart</Title>
        {/* <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        <FontAwesome
          style={{ position: 'absolute', right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color="black"
        /> */}
      </Header>

      {products.length > 0 ? (
        <>
          <FlatList
            data={products}
            renderItem={({ item }) => <ShoppingCartItem product={item} />}
          />
          <Button
            title="Checkout"
            onPress={() => navigation.navigate('CountDown')}
          />
        </>
      ) : (
        <Text>Empty</Text>
      )}
    </Container>
  );
};

export default ShoppingCart;
