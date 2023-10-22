import React,  { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
const Logo = '../../../assets/images/Claps.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client  = axios.create({
    baseURL: "https://c1fd-2800-150-140-1edf-306e-8f66-7ec0-3852.ngrok-free.app"
})
// Agregar onpress submitForm
function SignInScreen() {
    const divRef = useRef<HTMLInputElement>();
    const [CurrentUser, setCurrentUser] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [SignInMessage, setSignInMessage] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
	function update_form_btn(){
		if (SignInMessage){
			divRef.current = 'SignIn'
			setSignInMessage(true)
		}
		else{
			divRef.current = 'Login'
			setSignInMessage(false)
		}
	}   
    //FUNCION DE LOGIN ABAJO:::: V V V V V V V V 
    const submitsignin= (event: React.FormEvent) => {
		event.preventDefault();  
		client.post(
			"/login",     
			{
			username: username,
			password: password 
			}
		).then(function(res){
			setCurrentUser(true);
		})
		.catch((Error) =>   {
			console.error(Error)
		});
    }
    //const SignInMessage = () => {
    //  console.warn('Iniciando sesión');
    //};
    if (CurrentUser){
		return(
			<Text style={styles.title}>Iniciaste sesión</Text>
		)
    }
    
    return (
		<View style ={styles.root}>
			<Image style = {styles.tinyLogo} source = {require(Logo)}/>
			{/* <Text style={styles.title}>Inicio de Sesion</Text> */}
			<CustomInput
				placeholder="Ingresa tu correo electrónico"
				setValue = {setUsername}
				value={username}
				secureTextEntry={false}
				bgColor = '#ffffff'
				minWidth="70%"
			/>
			<CustomInput
				placeholder="Ingresa tu contraseña"
				secureTextEntry={true}
				setValue = {setPassword}
				value={password}
				bgColor = '#ffffff'
				minWidth="70%"
			/>
			<CustomButton
				text="Iniciar Sesion" 
				onPress={submitsignin}
				bgColor = '#8c1a28'
				fgColor = 'white'
				
			/>
			{/*
			<CustomButton
			text="Registrarse" 
			onPress={[submitsignup,update_form_btn]}
			bgColor='#c12537'
			// bgColor = '#9f2626'
			fgColor ='white'  />
			
			*/}
		</View>
	);
  }

const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: '#eb3838',
		fontSize: 20,
		fontWeight: 'bold',

	},
	tinyLogo: {
		width: 120,
		height: 55,
	},
})

export default SignInScreen;
    