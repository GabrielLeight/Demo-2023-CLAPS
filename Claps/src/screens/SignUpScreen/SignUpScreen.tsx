import React,  { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    Image,
	Dimensions,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
const Logo = '../../../assets/images/Claps.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client  = axios.create({
  baseURL: "https://2a1a-2800-150-140-1edf-25f2-8e65-b2d9-da1b.ngrok-free.app/"
})

// Agregar onpress submitForm
function SignUpScreen() {
	const [username, setUsername] = useState('');
	const [CurrentUser, setCurrentUser] = useState(false);
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const navigator = useNavigation();
    const onSignUpPressedNormal =  async (event: React.FormEvent) => {
		event.preventDefault();  
		try{
		const registerResponse = await client.post(
			"registerUser",
		{	
			username: username,
			first_name: username,
			last_name: username,
			email: email,
			password: password,
			password2: password2
		}).then(res =>{
			console.log('User registered:', res.data);
			const registerResponse =client.post(
			"login",     
			{	
				username: username,
				password: password 
			}
			).then(function(res){
				const token = res.data.access;
				AsyncStorage.setItem('authToken', token);
				setCurrentUser(true);
				navigator.navigate('HomeScreen' as never);
			
			})
		}).catch((Error) =>   {
			console.error(Error)
		});
		}
		catch(res){ }
    };
	// Crea un usuario normal
	const create = async () => {
		try {
		const response = await axios.post('YOUR_API_ENDPOINT', {
			email,
			password,
			first_name: firstName,
			last_name: lastName,
			is_active: true, // Set this as needed
		});

		// Handle success, e.g., navigate to a new screen or display a success message
		console.log('User registered:', response.data);
		} catch (error) {
		// Handle error, e.g., display an error message
		console.error('Registration failed:', error);
		}
	}

    // Navega al register de los teatros
	const onNewHallPressed = () => { 
		navigator.navigate('SignUpT' as never)
	}
	
	const onNewCompanyPressed = () => {
		navigator.navigate('SignUpC' as never)
	}
	const onSignInPressed = () => {
		navigator.navigate('SignIn' as never)
	}

	if (CurrentUser){
		return(
			<Text style={styles.title}>Iniciaste sesión!</Text>
		);
	};

	return (	
		<View style ={styles.root}>
			<Image style = {styles.tinyLogo} source = {require(Logo)}/>
			<Text style={styles.title}>Create una cuenta</Text>
			<CustomInput
				placeholder="Nombre"
				setValue ={setFirstName}
				value={firstName}
				secureTextEntry={false}
				bgColor = '#ffffff'		
			/>
			<CustomInput
					placeholder="Apellido"
					setValue ={setLastName}
					value={lastName}
					secureTextEntry={false}
					bgColor = '#ffffff'
			/>
			<CustomInput
				placeholder="Nombre de usuario"
				setValue ={setUsername}
				value={username}
				secureTextEntry={false}
				bgColor = '#ffffff'
			/>
			<CustomInput
				placeholder="Correo electrónico"
				setValue ={setEmail}
				value={email}
				secureTextEntry={false}
				bgColor = '#ffffff'
			/>

			<CustomInput
				placeholder="Contraseña"
				setValue = {setPassword}
				value={password}
				secureTextEntry={true}
				bgColor = '#ffffff' 
			/>
			<CustomInput
				placeholder="Contraseña"
				setValue = {setPassword2}
				value={password2}
				secureTextEntry={true}
				bgColor = '#ffffff' 
			/>
			<CustomButton
				text="Registrarse" 
				onPress={onSignUpPressedNormal}
				bgColor = "#266797"
				fgColor ="white"
			/>
			{/* Los teatros deben subir obras? o solamente los claps company? */}
			<CustomButton
				text="Regístrese como Teatro - Hall" 
				onPress={onNewHallPressed}
				bgColor = "#bfd6e9"
				fgColor ="#266797"
			/>
			<CustomButton
				text="Regístrese como Claps Company" 
				onPress={onNewCompanyPressed}
				bgColor = "#e7e7e7"
				fgColor ="#727678"
			/>
			<View style = {{flexDirection: 'row', marginTop: 2}}>
				<Text>¿Ya tienes cuenta? </Text>
				<CustomButton
					text="Entra aquí" 
					onPress={onSignInPressed}
					bgColor = 'transparent'
					fgColor = '#266797'
				/>
			</View>	
		</View>
		
	);
}

const styles = StyleSheet.create({
root: {
	flex: 1,
	padding: 20,
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#f6f8fa',
},

row: {
	width: '50%',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
},

title: {
	color: '#266797',
	fontSize: 20,
	fontWeight: 'bold',
	marginBottom: 3,
},

tinyLogo: {
	width: Dimensions.get('window').width * 0.60, // Ajusta el factor según tus necesidades
	height: Dimensions.get('window').height * 0.15, // Ajusta el factor según tus necesidades
},

})
export default SignUpScreen;
    