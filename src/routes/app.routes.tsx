import React, { useEffect, useState } from 'react';
import { StatusBar, Platform } from 'react-native';

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeButtom from '../components/HomeButton';
import CountDown from '../pages/CountDown';
import Discover from '../pages/Discover';
import ExternalIntervention from '../pages/ExternalIntervention';
import Home from '../pages/Home';
import Inbox from '../pages/Inbox';
import Me from '../pages/Me';
import ProductDetail from '../pages/ProductDetail';
import Purchase from '../pages/Purchase';
import Record from '../pages/Record';
import Shopping from '../pages/Shopping';
import ShoppingCart from '../pages/ShoppingCart';
import Think from '../pages/Think';
import config from '../config';
import End from '../pages/End';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const AppRoutes: React.FC = ({ navigation }) => {
  const [home, setHome] = useState(true);

  StatusBar.setBarStyle('dark-content');

  if (Platform.OS === 'android') StatusBar.setBackgroundColor('#fff');

  if (home) {
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setBarStyle('light-content');
    }
  } else {
    StatusBar.setHidden(false);
  }

  useEffect(() => {
    console.log('AppRoutes mounted');
    setTimeout(() => {
      navigation.navigate('ExternalIntervention');
    }, config.externalIntervention.time);
  }, []);

  return (
    <Tab.Navigator
      shifting={false}
      barStyle={{
        backgroundColor: home ? '#000' : '#fff',
      }}
      initialRouteName="Home"
      activeColor={home ? '#fff' : '#000'}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={{
          focus: () => setHome(true),
          blur: () => setHome(false),
        }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={Record}
        listeners={({ navigation }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate('Record');
          },
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <HomeButtom home={home} />,
        }}
      />
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={Shopping}
        options={{
          tabBarLabel: 'Shopping',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootStackScreen: React.FC = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Main"
        component={AppRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Record"
        component={Record}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Think"
        component={Think}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ShoppingCart"
        component={ShoppingCart}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CountDown"
        component={CountDown}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Purchase"
        component={Purchase}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ExternalIntervention"
        component={ExternalIntervention}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="End"
        component={End}
      />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
