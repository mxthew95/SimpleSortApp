import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ActionSheet from './components/ActionSheet';
import Main from './components/Main';
import store from './src/redux/store'
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Main />
      </View>
      <ActionSheet />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
  }
})

export default App
