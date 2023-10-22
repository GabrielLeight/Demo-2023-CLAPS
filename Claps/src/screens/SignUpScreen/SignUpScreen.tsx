import React,  { useState } from 'react';
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
	const [EsUsuario, setUsuario] = useState('');
	const [EsHall, setHall] = useState('');
	const [EsTeatro, setTeatro] = useState('');
	const [address, setAddress] = useState('');

	const navigator = useNavigation();
    const onSignUpPressedNormal = (event: React.FormEvent) => {
      event.preventDefault();  
      client.post(
        "/api/register",
      {
        email: email,
        password: password 
      }).then(function(res){
        client.post(
          "/api/login",     
          {
            email: email,
            password: password 
          }
        ).then(function(res){
          setCurrentUser(true);
        });
      });
    };

	const create = async () => {
    if (EsUsuario){
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
    if (EsHall){
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
    if (EsTeatro){
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
	};
	const onNewHallPressed = () => { // Acá deberia crearse un register para el teatro o hall
		navigator.navigate('SignT' as never)
	}
	
	if (CurrentUser){
		return(
			<Text style={styles.title}>""Habeis iniciado sesion :"\"</Text>
		);
	};

	return (
	
			
		<View style ={styles.root}>
			<Image style = {styles.tinyLogo} source = {require(Logo)}/>
			<Text style={styles.title}>¡Registrate!</Text>
			<CustomInput
				placeholder="Nombre de usuario"
				setValue ={setUsername}
				value={username}
				secureTextEntry={false}
				bgColor = '#ffffff'
			/>
			<View style = {styles.row}>
				<CustomInput
					placeholder="Nombre"
					setValue ={setUsername}
					value={username}
					secureTextEntry={false}
					bgColor = '#ffffff'		
				/>
				<CustomInput
					placeholder="Apellido"
					setValue ={setUsername}
					value={username}
					secureTextEntry={false}
					bgColor = '#ffffff'
				/>
			</View>
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
			<CustomButton
				text="Registrarse" 
				onPress={onSignUpPressedNormal}
				bgColor = "#bc2a3c"
				fgColor ="white"
			/>
			<CustomButton
				text="Regístrese como Teatro - Hall" 
				onPress={onNewHallPressed}
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
	backgroundColor: '#f6f8fa',
},

row: {
	width: '50%',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
},

title: {
	color: '#eb3838',
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
    