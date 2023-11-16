import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import client from '../../components/client';
import getAuthToken from '../authToken/getAuthToken';

const UserScreen = () =>{

    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        retrieveData();
      }, []);

    const retrieveData = async () => {
      const token = getAuthToken()
        const user = await client.get(
          "user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch();
        setUsername(user.data.username);
        setEmail(user.data.email);
    };

    const Logoff = async () => {
        await AsyncStorage.removeItem('authToken');
        navigation.navigate('SignIn' as never)
    }

    return (
      <View style = {styles.root}>
        <Text>Username: {username}</Text>
        <Text>Email: {email}</Text>
        <CustomButton
          text="Logout" 
          onPress={Logoff}
				  bgColor = "#FAE9EA"
				  fgColor ="#DD4D44"
			  />
        <CustomButton
          text="Delete Account" 
          onPress={null}
				  bgColor = "#red"
				  fgColor ="#DD4D44"
			  />
      </View>
    );
    }





const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'grey', // #f6f8fa
	},
	
	})
export default UserScreen;