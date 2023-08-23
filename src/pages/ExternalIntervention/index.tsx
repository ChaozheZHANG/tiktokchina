import React, { useEffect, useRef, useState } from 'react';

import { Button, Text, View } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { Container, Header, Title } from './styles';
import { useUserEventLogStore, useUserStore } from '../../stores';

import config from '../../config';

const ExternalIntervention: React.FC = ({ navigation }) => {
  const { eventLogs, addEventLog } = useUserEventLogStore();
  const jumpRef = useRef(true);
  const { user } = useUserStore();

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
    return `${min < 10 ? '0' : ''}${min} mins ${
      sec < 10 ? '0' : ''
    }${sec} secs`;
  }

  function getVideoTime(): number {
    console.log('getVideoTime', eventLogs);

    return timestamp2mmss(
      eventLogs.reduce((acc, log, i, arr) => {
        if (log.event === 'BrowseProductPage') {
          if (i === arr.length - 1) {
            return acc + Date.now() - log.timestamp;
          } else {
            return acc + arr[i + 1].timestamp - log.timestamp;
          }
        } else {
          return acc;
        }
      }, 0),
    );
  }

  return (
    <Container>
      <Header>
        <Title>App Usage</Title>
      </Header>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          rowGap: 10,
          padding: 10,
        }}
      >
        {eventLogs.length > 0 ? (
          <Text>
            Usage Time: {timestamp2mmss(Date.now() - eventLogs[0].timestamp)}
          </Text>
        ) : null}
        {eventLogs.length > 0 ? (
          <Text>Video Watch Time: {getVideoTime()}</Text>
        ) : null}
        <Text>
          Ignore this report:{' '}
          {eventLogs.filter(log => log.event === 'ignore').length}
        </Text>
        <Text style={{
          paddingTop: 20,
        }}>
          You have used this app for{' '}
          {timestamp2mmss(Date.now() - eventLogs[0].timestamp)} today. Do you
          want to continue?
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Button
          title="Ignore"
          onPress={() => {
            addEventLog({
              id: '1',
              event: 'ignore',
              userId: user.id,
              timestamp: Date.now(),
            });
            navigation.goBack();
          }}
        />
        <Button
          title="Quit"
          onPress={() => {
            jumpRef.current = false;
            addEventLog({
              id: '1',
              event: 'endShopping',
              userId: user.id,
              timestamp: Date.now(),
            });
            navigation.navigate('End');
          }}
        />
      </View>

      {/* <Text>{JSON.stringify(eventLogs)}</Text> */}
    </Container>
  );
};

export default ExternalIntervention;
