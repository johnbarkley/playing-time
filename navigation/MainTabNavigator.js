import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TimerScreen from '../screens/TimerScreen';
import RostersScreen from '../screens/RostersScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const TimerStack = createStackNavigator(
  {
    Home: TimerScreen,
  },
  config
);

TimerStack.navigationOptions = {
  tabBarLabel: 'Timer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-timer' : 'md-timer'} />
  ),
};

TimerStack.path = '';

const RostersStack = createStackNavigator(
  {
    Settings: RostersScreen,
  },
  config
);

RostersStack.navigationOptions = {
  tabBarLabel: 'Rosters',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

RostersStack.path = '';

const tabNavigator = createBottomTabNavigator({
  TimerStack,
  RostersStack,
});

tabNavigator.path = '';

export default tabNavigator;
