import React from 'react';
import { Button, FlatList, ScrollView, Text, View, Image } from 'react-native';

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
import { Product, useShoppingCartStore, useWalletStore } from '../../stores';
import WalletVisualization from '../../components/WalletVisualization';

const ProductDetail: React.FC = ({ route, navigation }) => {
  const { product } = route.params as { product: Product };
  const { addProduct } = useShoppingCartStore();
  const { virtualBalance, removeMoney } = useWalletStore();

  function addProductToShoppingCart(): void {
    addProduct(product);
    navigation.navigate('Think', {
      contents: [
        {
          title: 'Think',
          content: (
            <WalletVisualization balance={virtualBalance - product.price} />
          ),
          next: 'Think',
        },
        {
          title: 'Think twice',
          content: <Text>Think about the product</Text>,
          callback: () => {
            removeMoney(product.price);
          },
          next: 'Main',
        },
      ],
      currentLevel: 0,
    });
  }

  return (
    <Container>
      <Header>
        {/* <AntDesign
          style={{ position: 'absolute', left: 10, top: 10 }}
          name="adduser"
          size={24}
          color="black"
        /> */}
        <Title>Product Detail</Title>
        {/* <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        <FontAwesome
          style={{ position: 'absolute', right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color="black"
        /> */}
      </Header>
      <Image
        style={{
          width: 150,
          height: 100,
        }}
        source={{ uri: product.image }}
      />
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
      <Text>
        {product.description ?? 'No detailed description for this product.'}
      </Text>
      <WalletVisualization />
      <Button title="Add to Shopping Cart" onPress={addProductToShoppingCart} />
    </Container>
  );
};

export default ProductDetail;
