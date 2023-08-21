import React, { useEffect, useState } from 'react';

import { Button, Text } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { Container, Header, Title } from './styles';
import { useUserEventLogStore } from '../../stores';

import config from '../../config';

const ExternalIntervention: React.FC = ({ navigation }) => {
  const { eventLogs } = useUserEventLogStore();

  useEffect(() => {
    console.log('ExternalIntervention mounted');

    const unsubscribe = navigation.addListener('blur', () => {
      // Do something when the screen blurs
      setTimeout(() => {
        navigation.navigate('ExternalIntervention');
      }, config.externalIntervention.time);
    });

    return unsubscribe;
  }, [navigation]);

  function timestamp2mmss(timestamp: number): string {
    const min = Math.floor(timestamp / 60000);
    const sec = Math.floor((timestamp % 60000) / 1000);
    // in a format of mm:ss
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  }

  return (
    <Container>
      <Header>
        <Title>App Usage</Title>
      </Header>
      {eventLogs.length > 0 ? (
        <Text>Time used: {timestamp2mmss(Date.now() - eventLogs[0].timestamp)}</Text>
      ) : null}
      <Text>{JSON.stringify(eventLogs)}</Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Container>
  );
};

export default ExternalIntervention;
