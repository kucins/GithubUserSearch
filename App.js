/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Search from './src/components/Search';
import UserPage from './src/components/UserPage';
import Followers from './src/components/Followers';
import Following from './src/components/Following';
import Repos from './src/components/Repos';
import { StackNavigator } from 'react-navigation';

export default class App extends Component<{}> {
  render() {
    return (
      <Navigation/>
    );
  }
}

export const Navigation = StackNavigator({
  Search:{
    screen: Search
  },
  UserPage:{
    screen: UserPage
  },
  UserPageNew:{
    screen: UserPage
  },
  Followers:{
    screen: Followers
  },
  Following:{
    screen: Following
  },
  Repos: {
    screen: Repos
  }
},
{
  headerMode:'none',
}
);