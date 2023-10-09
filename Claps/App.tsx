/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,  { useState }from 'react';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LoginForm from './src/screens/LoginForm/LoginForm';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style = {styles.root}>
      <LoginForm/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'orange'
  },
  input: {
    borderWidth: 2,
    borderColor: 'white',
    textAlign: 'center',
    opacity: 0.5,
    borderRadius: 10,
    margin: 5,
    width: "65%",
  },
  button: {
    backgroundColor: 'orange', color: 'white',
    alignItems: 'center',
    width: "65%",
    paddingVertical: 10,
    borderRadius: 10,
    margin:5,
  },
});

export {styles};
export default App;