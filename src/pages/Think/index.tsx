import React from 'react';
import { FlatList, ScrollView, Text, View, Button } from 'react-native';

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

interface ThinkPageProps {
  title: string;
  content: JSX.Element;
  callback?: () => void;
  next: string;
}

const Think: React.FC<{
  route: any;
  navigation: any;
}> = ({ route, navigation }) => {
  const {
    contents,
    currentLevel,
  }: { contents: ThinkPageProps[]; currentLevel: number } = route.params;
  return (
    <Container>
      <Header>
        {/* <AntDesign
          style={{ position: 'absolute', left: 10, top: 10 }}
          name="adduser"
          size={24}
          color="black"
        /> */}
        <Title>{contents[currentLevel].title}</Title>
        {/* <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        <FontAwesome
          style={{ position: 'absolute', right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color="black"
        /> */}
      </Header>
      <View>
        {contents[currentLevel].content}
        <Button
          title="Back"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          title="Continue"
          onPress={() => {
            if (contents[currentLevel].callback)
              contents[currentLevel].callback!();
            navigation.navigate(contents[currentLevel].next, {
              contents: contents,
              currentLevel: currentLevel + 1,
            });
          }}
        />
      </View>
    </Container>
  );
};

export default Think;
