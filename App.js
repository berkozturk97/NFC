import React, {Fragment} from 'react';
import {Provider} from 'react-native-paper';
import {SafeAreaView, StatusBar} from 'react-native';
import App from './src';
import {theme} from './src/core/theme';

const Main = () => (
  <Fragment>
    <SafeAreaView style={{flex: 0, backgroundColor: '#072c14'}} />
    <SafeAreaView style={{flex: 1, backgroundColor: '#072c14'}}>
      <StatusBar backgroundColor="#072c14" barStyle="light-content" />
      <Provider theme={theme}>
        <App />
      </Provider>
    </SafeAreaView>
  </Fragment>
);

export default Main;
