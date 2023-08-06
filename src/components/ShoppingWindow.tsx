// ShoppingWindow.tsx
import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import { Product, useShoppingCartStore } from '../stores';

const ShoppingWindow: React.FC<{ product: Product; navigation: any }> = ({
  product,
  navigation,
}) => {
  // const product: Product = {
  //   name: 'Example product',
  //   price: '99.99',
  //   image: 'https://example.com/product.jpg',
  // };
  const { addProduct } = useShoppingCartStore();

  const handleBuy = () => {
    console.log('Buy button clicked');
    navigation.navigate('ProductDetail', { product });
  };

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
      <Button title="Buy" onPress={handleBuy} />
    </View>
  );
};

export default ShoppingWindow;