import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, Image, Dimensions, } from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import client from '../../components/client';
import getAuthToken from '../authToken/getAuthToken';
const Logo = '../../../assets/images/mask.png';

const UserScreen = () =>{
    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const navigation = useNavigation();

	useEffect(() => {
		retrieveData();
		}, []);

    const retrieveData = async () => {
		const token = await getAuthToken()
		try {
			const user = await client.get(
				"user", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			// console.log("User data from server:", user.data); // En caso de testear
			setUsername(user.data.user.username);
			setEmail(user.data.user.email);
			} catch(error){
				console.error("Error retrieving user data:", error);
		}
			
    };

    const Logoff = async () => {
        await AsyncStorage.removeItem('authToken');
        navigation.navigate('SignIn' as never)
    }

    const deleteUser = async () => {
		await client.post(
			"deleteUser",
			{
			username: username
			}
		).then(() => {
			console.log("User deleted");
			AsyncStorage.removeItem('authToken');
			navigation.navigate("SignIn" as never);
		}).catch((Error) => {
			console.error(Error);
		})
    }

    return (
      <View style = {styles.root}>
		<Image style = {styles.tinyLogo} source = {require(Logo)}/>
		<View style = {styles.cuadrado}>
			<Text style = {styles.title}>¡Saludos {username}!</Text>
			<Text style = {styles.texto}>Tus datos son:</Text>
			<Text style = {styles.texto}> Nombre de usuario: {username}</Text>
			<Text style = {styles.texto}> Correo electrónico: {email}</Text>
		</View>
	
        <CustomButton
			text="Eliminar cuenta" 
			onPress={deleteUser}
			bgColor = "#red"
			fgColor ="#DD4D44"
		/>
		<CustomButton
			text="Salir de la cuenta" 
			onPress={Logoff}
			bgColor = "#FAE9EA"
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
		// backgroundColor: 'grey', // #f6f8fa
	},
	title:{
		fontSize: 22,
		color: 'black',
		fontWeight: 'bold',
	},
	texto: {
		color: 'black',
		fontSize: 16,
	},
	cuadrado: {
		backgroundColor: 'light-blue',
	},
	tinyLogo: {
		width: Dimensions.get('window').width * 0.6, // Ajusta el factor según tus necesidades
		height: Dimensions.get('window').height * 0.30, // Ajusta el factor según tus necesidades
	},
	})
export default UserScreen;