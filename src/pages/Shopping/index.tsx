import React from 'react';
import { FlatList, ScrollView, Text } from 'react-native';

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

const Shopping: React.FC = ({ navigation }) => {
  return (
    <Container>
      <Header>
        {/* <AntDesign
          style={{ position: 'absolute', left: 10, top: 10 }}
          name="adduser"
          size={24}
          color="black"
        /> */}
        <Title>Shopping</Title>
        {/* <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        <FontAwesome
          style={{ position: 'absolute', right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color="black"
        /> */}
      </Header>
      <FlatList
        data={[
          {
            id: '1',
            name: 'Example product',
            price: '79.99',
            image: 'https://fakeimg.pl/600x400',
            description:
              'This is a description of this product. It is very good. You should buy it.',
          },
          {
            id: '2',
            name: 'Example product',
            price: '89.99',
            image: 'https://fakeimg.pl/600x400',
          },
          {
            id: '3',
            name: 'Example product',
            price: '99.99',
            image: 'https://fakeimg.pl/600x400',
          },
          {
            id: '4',
            name: 'Example product',
            price: '99.99',
            image: 'https://fakeimg.pl/600x400',
          },
          {
            id: '5',
            name: 'Example product',
            price: '99.99',
            image: 'https://fakeimg.pl/600x400',
          },
          {
            id: '6',
            name: 'Example product',
            price: '99.99',
            image: 'https://fakeimg.pl/600x400',
          },
          {
            id: '7',
            name: 'Example product',
            price: '99.99',
            image: 'https://fakeimg.pl/600x400',
          },
          {
            id: '8',
            name: 'Example product',
            price: '99.99',
            image: 'https://fakeimg.pl/600x400',
          },
          {
            id: '9',
            name: 'Example product',
            price: '99.99',
            image: 'https://fakeimg.pl/600x400',
          },
        ]}
        renderItem={({ item }) => (
          <ShoppingWindow product={item} navigation={navigation} />
        )}
      />
    </Container>
  );
};

export default Shopping;
