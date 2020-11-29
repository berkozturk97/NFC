import React, {Component} from 'react';
import {AppRegistry, View, Text} from 'react-native';
import {name as appName} from './app.json';
import {Router} from './src/Router';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Router />
      </View>
    );
  }
}

//App = codePush(codePushOptions)(App);
AppRegistry.registerComponent(appName, () => App);
