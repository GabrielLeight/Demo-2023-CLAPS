import React from 'react'
import { View, Text } from 'react-native'

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import FormReviewScreen from '../screens/FormReviewScreen';
import ShowTeatro from '../screens/ShowTeatro';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Navigation() {
return (
	<NavigationContainer>
	    <Stack.Navigator screenOptions ={{headerShown: false}}>
	    	<Stack.Screen name="SignIn" component={SignInScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="FormReview" component={FormReviewScreen} />
			<Stack.Screen name="ShowTeatro" component={ShowTeatro} />
	    </Stack.Navigator>
	</NavigationContainer>
);
}

export default Navigation;