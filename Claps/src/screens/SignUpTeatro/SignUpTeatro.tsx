import React,  { useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
	Dimensions,
    Image,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import client from '../../components/client';
import { useNavigation } from '@react-navigation/native';

const Logo = '../../../assets/images/Claps.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


function SignUpTeatro() {
	const [username, setUsername] = useState('');
	const [CurrentUser, setCurrentUser] = useState(false); // Se debe agregar para utilizar
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [city, setCity] = useState('');
	const [direccion, setDireccion] = useState('');

	const navigator = useNavigation();

	const create = async () => {
        try {
            const response = await client.post('registerTeatro', {
				username: username,
                email: email,
				city: city,
                password: password,
				password2: passwordRepeat,
                direction: direccion,
                is_active: true, // Set this as needed
            });
        // Handle success, e.g., navigate to a new screen or display a success message
        console.log('User registered:', response.data);
		navigator.navigate('HomeScreen' as never)
        } catch (error) {
			// Handle error, e.g., display an error message
			console.error('Registration failed:', error);
        }
	};

	if (CurrentUser){
		return(
			<Text style={styles.title}>"Iniciaste sesión"</Text>
		)
	}
	const onSignInPressed = () => {
		navigator.navigate('SignIn' as never)
	}
	return (
		<>
		<View style ={styles.root}>
			<Image style = {styles.tinyLogo} source = {require(Logo)}/>
			<Text style={styles.title}>¡Registra tu teatro!</Text>
				<CustomInput
					placeholder="Nombre del teatro"
					setValue ={setUsername}
					value={username}
					secureTextEntry={false}
					bgColor = '#ffffff'
				/>
				<CustomInput
                    placeholder="Ingresa la dirección del teatro"
                    setValue = {setDireccion}
                    value={direccion}
                    secureTextEntry={false}
                    bgColor = '#ffffff' 
				/>		
				<CustomInput
                    placeholder="Ingresa la ciudad"
                    setValue = {setCity}
                    value={city}
                    secureTextEntry={false}
                    bgColor = '#ffffff' 
				/>		
				<CustomInput
					placeholder="Ingresa tu correo electrónico"
					setValue ={setEmail}
					value={email}
					secureTextEntry={false}
					bgColor = '#ffffff'
				/>
				<CustomInput
					placeholder="Ingresa tu contraseña"
					setValue = {setPassword}
					value={password}
					secureTextEntry={true}
					bgColor = '#ffffff' 
				/>
				<CustomInput
					placeholder="Ingresa tu contraseña"
					setValue = {setPasswordRepeat}
					value={passwordRepeat}
					secureTextEntry={true}
					bgColor = '#ffffff' 
				/>
                <CustomButton
					text="Registrarse" 
					onPress={create}
					bgColor = "#266797"
					fgColor ="#ffffff"
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
		</>
	);
}

const styles = StyleSheet.create({
root: {
	flex: 1,
	backgroundColor: '#f6f8fa',
	padding: 20,
	alignItems: 'center',
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
	color: '#266797',
	fontSize: 20,
	fontWeight: 'bold',
	marginBottom: 3,
},

tinyLogo: {
	width: Dimensions.get('window').width * 0.60, // Ajusta el factor según tus necesidades
	height: Dimensions.get('window').height * 0.15, // Ajusta el factor según tus necesidades
},
input:{
	color: 'rgb(169, 27, 13)',
	textAlign: 'center',
},
})
export default SignUpTeatro;
    