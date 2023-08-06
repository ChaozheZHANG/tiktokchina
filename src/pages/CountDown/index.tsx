import React from 'react';
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
import { useWalletStore } from '../../stores';

const CountDown: React.FC = ({ navigation }) => {
  const [time, setTime] = React.useState(3);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    return () => {
      console.log('countdown unmounted');
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    // console.log('time changed', time);
    if (time === 0) {
      navigation.navigate('Purchase');
      console.log('purchase');
    }
  }, [time]);

  function second2mmss(second: number): string {
    const min = Math.floor(second / 60);
    const sec = second % 60;
    // in a format of mm:ss
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
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
        <Title>Count Down</Title>
        {/* <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        <FontAwesome
          style={{ position: 'absolute', right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color="black"
        /> */}
      </Header>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 100,
          }}
        >
          {second2mmss(time)}
        </Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </Container>
  );
};

export default CountDown;
