// ShoppingWindow.tsx
import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import { Product } from '../stores';

const ShoppingCartItem: React.FC<{ product: Product }> = ({ product }) => {
  // const product: Product = {
  //   name: 'Example product',
  //   price: '99.99',
  //   image: 'https://example.com/product.jpg',
  // };

  return (
    <View>
      <Image
        style={{
          width: 150,
          height: 100,
        }}
        source={{ uri: product.image }}
      />
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
    </View>
  );
};

export default ShoppingCartItem;
