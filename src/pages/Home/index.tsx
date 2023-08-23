import React, { useState, useEffect } from 'react';

import { View } from 'react-native';

// import ViewPager from '@react-native-community/viewpager';
import PagerView from 'react-native-pager-view';

import server from '../../../server.json';
import prodocts from '../../../server-products.json';
import Feed from './Feed';

import { useUserEventLogStore, useUserStore } from '../../stores';
import { Container, Header, Text, Tab, Separator } from './styles';

const Home: React.FC = ({ navigation }) => {
  const [tab, setTab] = useState(1);
  const [active, setActive] = useState(0);

  const { addEventLog } = useUserEventLogStore();
  const { user } = useUserStore();

  useEffect(() => {
    console.log('Browse product videos mounted');

    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      console.log('Browse product videos focused');

      addEventLog({
        id: '1',
        event: 'BrowseProductPage',
        userId: user.id,
        timestamp: Date.now(),
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Header>
        <Tab onPress={() => setTab(1)}>
          <Text active={tab === 1}>Following</Text>
        </Tab>
        <Separator>|</Separator>
        <Tab onPress={() => setTab(2)}>
          <Text active={tab === 2}>For You</Text>
        </Tab>
      </Header>
      <PagerView
        onPageSelected={e => {
          setActive(e.nativeEvent.position);
        }}
        orientation="vertical"
        style={{ flex: 1 }}
        initialPage={0}
      >
        {server.feed.map((item, i) => (
          <View key={item.id}>
            <Feed
              item={item}
              product={prodocts[i]}
              play={Number(item.id) === active}
              navigation={navigation}
            />
          </View>
        ))}
      </PagerView>
    </Container>
  );
};

export default Home;
