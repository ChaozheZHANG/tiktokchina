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
import {
  useShoppingCartStore,
  useUserEventLogStore,
  useWalletStore,
  useUserStore,
} from '../../stores';

const Purchase: React.FC = ({ navigation }) => {
  const { actualBalance, applyPurchase } = useWalletStore();
  const { addEventLog } = useUserEventLogStore();
  const { user } = useUserStore();
  const { clearCart, products } = useShoppingCartStore();

  useEffect(() => {
    applyPurchase();
    products.forEach(product => {
      addEventLog({
        id: '1',
        event: 'purchase',
        userId: user.id,
        productId: `${product.id}`,
        timestamp: Date.now(),
      });
    });
    clearCart();
  }, []);

  return (
    <Container>
      <Header>
        {/* <AntDesign
          style={{ position: 'absolute', left: 10, top: 10 }}
          name="adduser"
          size={24}
          color="black"
        /> */}
        <Title>Purchase</Title>
        {/* <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        <FontAwesome
          style={{ position: 'absolute', right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color="black"
        /> */}
      </Header>
      <View>
        <Text>
          Thank you for your purchase! You now have ${actualBalance} left.
        </Text>
        <Button
          title="Back to the Main Page"
          onPress={() => navigation.navigate('Main')}
        />
      </View>
    </Container>
  );
};

export default Purchase;
