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
import client from '../../components/client';

const Logo = '../../../assets/images/Claps.png';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Agregar onpress submitForm
function SignUpCompany() {
	const [username, setUsername] = useState('');
	const [CurrentUser, setCurrentUser] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPasswordRepeat] = useState('');


	const navigator = useNavigation();

	const create = async (event: React.FormEvent) => {
		try {
			const response = await client.post('registerCompany', {
				username: username,
				password: password,
				password2: password2,
				email: email
				
				
			});
        // Handle success, e.g., navigate to a new screen or display a success message
        console.log('User registered:', response.data);
        } catch (error) {
        // Handle error, e.g., display an error message
        console.error('Registration failed:', error);
        }

        }
	

	if (CurrentUser){
		return(
			<Text style={styles.title}>"Iniciaste sesión!"</Text>
		)
	}

	const onSignInPressed = () => {
		navigator.navigate('SignIn' as never)
	}
	return (
		<>
		<View style ={styles.root}>
			<Image style = {styles.tinyLogo} source = {require(Logo)}/>
			<Text style={styles.title}>¡Registra tu Claps Company!</Text>
				<CustomInput
					placeholder="Nombre de la Claps Company"
					setValue ={setUsername}
					value={username}
					secureTextEntry={false}
					bgColor = '#ffffff'
				/>
				<CustomInput
					placeholder="Ingresar correo electrónico"
					setValue ={setEmail}
					value={email}
					secureTextEntry={false}
					bgColor = '#ffffff'
				/>

				<CustomInput
					placeholder="Ingresar contraseña"
					setValue = {setPassword}
					value={password}
					secureTextEntry={true}
					bgColor = '#ffffff' 
				/>
				<CustomInput
					placeholder="Ingresar contraseña"
					setValue = {setPasswordRepeat}
					value={password2}
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
export default SignUpCompany;
        