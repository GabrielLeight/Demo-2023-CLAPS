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
    padding: 20,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'orange',
    fontWeight: 'bold',
  },
});


export default App;