/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,  { useState }from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Navigation from './src/navigation';


function App(): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';
	const [CurrentUser, setCurrentUser] = useState(false);
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};
	return (
		<SafeAreaView style = {styles.root}>
			<Navigation/>
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
		color: 'orange',
		fontWeight: 'bold',
	},
});

export {styles};
export default App;