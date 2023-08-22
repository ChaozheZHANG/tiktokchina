import React, { useEffect, useRef, useState } from 'react';

import { Button, Text } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { Container, Header, Title } from './styles';
import { useUserEventLogStore } from '../../stores';

import config from '../../config';

const ExternalIntervention: React.FC = ({ navigation }) => {
  const { eventLogs } = useUserEventLogStore();
  const jumpRef = useRef(true);

  useEffect(() => {
    console.log('ExternalIntervention mounted');

    const unsubscribe = navigation.addListener('blur', () => {
      // Do something when the screen blurs
      if (jumpRef.current) {
        setTimeout(() => {
          navigation.navigate('ExternalIntervention');
        }, config.externalIntervention.time);
      }
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
        <Text>
          Time used: {timestamp2mmss(Date.now() - eventLogs[0].timestamp)}
        </Text>
      ) : null}
      <Button
        title="Ignore"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Button
        title="Quit"
        onPress={() => {
          jumpRef.current = false;
          navigation.navigate('End');
        }}
      />
      <Text>{JSON.stringify(eventLogs)}</Text>
    </Container>
  );
};

export default ExternalIntervention;
