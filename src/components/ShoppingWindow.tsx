// ShoppingWindow.tsx
import React from 'react';
import { View, Image, Text, Button } from 'react-native';
import {
  Product,
  useShoppingCartStore,
  useUserEventLogStore,
  useUserStore,
} from '../stores';

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
  const { user } = useUserStore();
  const { addEventLog } = useUserEventLogStore();

  const handleBuy = (): void => {
    console.log('Buy button clicked');
    addEventLog({
      id: '1',
      event: 'buy',
      userId: user.id,
      productId: product.id,
      timestamp: Date.now(),
    });
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
