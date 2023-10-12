import React,  { useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import {styles} from '../../../App';
import CustomButton from '../../components/CustomButton';

// Agregar onpress submitForm
function SignUpScreen() {
  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    
    
  

    

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
    
    const loginMessage = () => {
      console.warn('Iniciando sesión');
    };
    
    return (
      <View style ={styles.root}>
        <Text style={styles.title}>Inicio de Sesion</Text>
        <TextInput 
            style={styles.input}
            placeholder="Ingresa tu correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
        />
        <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            value={password}
        />
        <CustomButton
          text="Registrarse" 
          onPress={create}
          bgColor = "#FAE9EA"
          fgColor ="#DD4D44"
        />
    </View>
    );
  }

export default SignUpScreen;
    