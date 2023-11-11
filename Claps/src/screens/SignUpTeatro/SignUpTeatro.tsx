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
import { useNavigation } from '@react-navigation/native';
const Logo = '../../../assets/images/Claps.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client  = axios.create({
  baseURL: "https://2a1a-2800-150-140-1edf-25f2-8e65-b2d9-da1b.ngrok-free.app/"
})

// Agregar onpress submitForm
function SignUpTeatro() {
	const [username, setUsername] = useState('');
	const [CurrentUser, setCurrentUser] = useState(false);
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [EsUsuario, setUsuario] = useState(false);
	const [EsTeatro, setTeatro] = useState(true);
	const [direccion, setDireccion] = useState('');


	const navigator = useNavigation();

	const create = async () => {
       
            try {
            const response = await axios.post('registerTeatro', {
				username: username,
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                direccion: direccion,
                is_active: true, // Set this as needed
            });

        // Handle success, e.g., navigate to a new screen or display a success message
        console.log('User registered:', response.data);
        } catch (error) {
        // Handle error, e.g., display an error message
        console.error('Registration failed:', error);
        }

		navigator.navigate('HomeScreen' as never)
        
	};

	if (CurrentUser){
		return(
			<Text style={styles.title}>""Habeis iniciado sesion :"\"</Text>
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
    