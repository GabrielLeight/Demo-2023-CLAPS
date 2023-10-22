import React from 'react'
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ShowTeatro from '../screens/ShowTeatro';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpTeatro from '../screens/SignUpTeatro';

const Stack = createNativeStackNavigator();

function Navigation() {
return (
	<NavigationContainer>
	    <Stack.Navigator screenOptions ={{headerShown: false}}>
	    	<Stack.Screen name="SignIn" component={SignInScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="FormReview" component={ReviewScreen} />
			<Stack.Screen name="ShowTeatro" component={ShowTeatro} />
			<Stack.Screen name="SignT" component={SignUpTeatro} />
	    </Stack.Navigator>
	</NavigationContainer>
);
}

export default Navigation;