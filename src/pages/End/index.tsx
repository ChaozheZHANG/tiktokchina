import React, { useEffect, useState } from 'react';

import { Button, Text } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import { Container, Header, Title } from './styles';
import { useUserEventLogStore } from '../../stores';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
// import * as Permissions from 'expo-permissions';

import config from '../../config';

const End: React.FC = ({ navigation }) => {
  const { eventLogs } = useUserEventLogStore();
  const [done, setDone] = useState(false);
  const fileUri = `${FileSystem.documentDirectory}text.txt`;

  async function saveLogs(): Promise<void> {
    const logs = JSON.stringify(eventLogs);

    // const fileUri = `${FileSystem.documentDirectory}text.txt`;
    await FileSystem.writeAsStringAsync(fileUri, logs, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    await Sharing.shareAsync(fileUri, {
      dialogTitle: 'Is it a snake or a hat?',
    });
    setDone(true);
  }

  return (
    <Container>
      <Header>
        <Title>Thank you for joining this experiment</Title>
      </Header>
      <Button
        title="Save Logs"
        onPress={() => {
          saveLogs();
        }}
      />
      {done ? <Text>Logs saved: {fileUri}</Text> : null}
    </Container>
  );
};

export default End;
