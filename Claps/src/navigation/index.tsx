import React from 'react'

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignUpTeatro from '../screens/SignUpTeatro';
import SignUpCompany from '../screens/SignUpCompany';
import ReviewScreen from '../screens/ReviewScreen';
import ShowTeatro from '../screens/ShowTeatro';
import CreateShows from '../screens/CreateShows';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
	return (
		<Tab.Navigator 
		initialRouteName='FormReview'
		screenOptions={{headerShown: false}}
		>
			<Tab.Screen name="Usuario" component={ReviewScreen} />
			<Tab.Screen name="Teatros" component={ShowTeatro} />
		</Tab.Navigator>
	)
}
function Navigation() {
return (
	<NavigationContainer>
	    <Stack.Navigator screenOptions ={{headerShown: false}}>
			
	    	<Stack.Screen name="SignIn" component={SignInScreen} /><Stack.Screen name="CreateShows" component={CreateShows} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="SignUpT" component={SignUpTeatro} />
			<Stack.Screen name="SignUpC" component={SignUpCompany} />
			<Stack.Screen name="Show" component={ShowTeatro} />
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
	    </Stack.Navigator>
	</NavigationContainer>
);
}

export default Navigation;