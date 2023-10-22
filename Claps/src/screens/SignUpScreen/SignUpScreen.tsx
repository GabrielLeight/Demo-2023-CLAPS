import React,  { useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
const Logo = '../../../assets/images/Claps.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client  = axios.create({
  baseURL: "http://127.0.0.1:8000"
})

// Agregar onpress submitForm
function SignUpScreen() {
	const [username, setUsername] = useState('');
	const [CurrentUser, setCurrentUser] = useState(false);
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');


	const submitsignup = (event: React.FormEvent) => {
		event.preventDefault();  
		client.post(
		"/register",
		{
		username: username,
		password: password 
		}).then(function(res){
		client.post(
			"/login",     
			{
			username: username,
			password: password 
			}
		).then(function(res){
			setCurrentUser(true);
		});
		});
	};


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
	};

	if (CurrentUser){
		return(
		<Text style={styles.title}>""Habeis iniciado sesion :"\"</Text>
		)
	}

	return (
		<>
		<View style ={styles.root}>
			<Image style = {styles.tinyLogo} source = {require(Logo)}/>
			<Text style={styles.title}>¡Registrate!</Text>
			<View>
				<CustomInput
					placeholder="Nombre de usuario"
					setValue ={setUsername}
					value={username}
					secureTextEntry={false}
					bgColor = '#ffffff'
					minWidth="70%"
				/>
				<View style ={styles.flexRow}>
					<View style = {styles.inputContainer}>
						<CustomInput
							placeholder="Nombre"
							setValue ={setFirstName}
							value={firstName}
							secureTextEntry={false}
							bgColor = '#ffffff'
							minWidth="35%"
						/>
					</View>
					<View style = {styles.inputContainer}>
						<CustomInput
							placeholder="Apellido"
							setValue ={setLastName}
							value={lastName}
							secureTextEntry={false}
							bgColor = '#ffffff'
							minWidth="35%"
						/>
					</View>
				</View>
				
				<CustomInput
					placeholder="Ingresa tu correo electrónico"
					setValue ={setEmail}
					value={email}
					secureTextEntry={false}
					bgColor = '#ffffff'
					minWidth="70%"
				/>
				<CustomInput
					placeholder="Ingresa tu contraseña"
					setValue = {setPassword}
					value={password}
					secureTextEntry={true}
					bgColor = '#ffffff' 
					minWidth="70%"
				/>
				<CustomButton
					text="Registrarse" 
					onPress={create}
					bgColor = "#FAE9EA"
					fgColor ="#DD4D44"
				/>
			</View>   
		</View>
		</>
	);
}

const styles = StyleSheet.create({
root: {
	flex: 1,
	padding: 10,
	alignItems: 'center',
	backgroundColor: '',
	justifyContent: 'center',
},

inputContainer:{
	marginHorizontal: 2,
	flex: 1,
},

flexRow: {
	flexDirection: 'row', // Esto hará que los elementos se alineen en una fila horizontal
	alignItems: 'center',// Esto alineará los elementos verticalmente en el centro
	justifyContent: 'center',
},

title: {
	color: '#eb3838',
	fontSize: 20,
	fontWeight: 'bold',
	marginBottom: 3,
},

tinyLogo: {
	width: 120,
	height: 55,
},

input:{
	color: 'rgb(169, 27, 13)',
	textAlign: 'center',
},
})
export default SignUpScreen;
    