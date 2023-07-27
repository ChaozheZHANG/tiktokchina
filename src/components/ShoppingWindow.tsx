// ShoppingWindow.tsx
import React from 'react';
import { View, Image, Text, Button } from 'react-native';

interface Product {
  name: string;
  price: string;
  image: string;
}

const ShoppingWindow: React.FC<{ product: Product }> = ({ product }) => {
  // const product: Product = {
  //   name: 'Example product',
  //   price: '99.99',
  //   image: 'https://example.com/product.jpg',
  // };

  const handleBuy = () => {
    console.log('Buy button clicked');
  };

  return (
    <View>
      <Image source={{ uri: product.image }} />
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
      <Button title="Buy" onPress={handleBuy} />
    </View>
  );
};

export default ShoppingWindow;
