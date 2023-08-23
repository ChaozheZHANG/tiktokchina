import React, { useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

import { useUserEventLogStore, useUserStore } from '../../stores';

import { Container, Header, Title } from './styles';

const StudySetup: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { addEventLog } = useUserEventLogStore();
  const { user, setUser } = useUserStore();
  const [uid, setUid] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [condition, setCondition] = React.useState('1');

  function checkUid(): boolean {
    if (uid === '') {
      setIsError(true);
      return false;
    }
    return true;
  }

  return (
    <Container>
      <Header>
        <Title>User Study</Title>
      </Header>
      <View
        style={{
          padding: 20,
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <View>
          <Text
            style={{
              color: isError ? 'red' : 'black',
            }}
          >
            User ID:
          </Text>
          <TextInput
            placeholder="Type your user ID here"
            onChangeText={newText => setUid(newText)}
            defaultValue={uid}
          />
        </View>
        <View>
          <Text>Study Condition: {condition}</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <Button
              title="Condition 1"
              onPress={() => {
                setCondition('1');
              }}
            />
            <Button
              title="Condition 2"
              onPress={() => {
                setCondition('2');
              }}
            />
            <Button
              title="Condition 3"
              onPress={() => {
                setCondition('3');
              }}
            />
            <Button
              title="Condition 4"
              onPress={() => {
                setCondition('4');
              }}
            />
          </View>
        </View>
        <View>
          <Button
            title="Start"
            onPress={() => {
              if (!checkUid()) {
                return;
              }
              addEventLog({
                id: '1',
                event: 'startStudy',
                userId: uid,
                condition,
                timestamp: Date.now(),
              });

              // condition 1: only external
              // condition 2: only internal
              // condition 3: both
              // condition 4: neither
              setUser({
                id: uid,
                name: uid,
                condition,
              });
              navigation.navigate('Main');
            }}
          />
        </View>
      </View>
    </Container>
  );
};

export default StudySetup;
