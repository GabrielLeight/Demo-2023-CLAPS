import React,  { useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

// Agregar onpress submitForm
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const submitForm = (event: React.FormEvent) => {
      
      //event.preventDefault();
      // Add your form submission logic here
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
    
    const loginMessage = () => {
      console.warn('Iniciando sesión');
    };
    
    return (
      <View style ={styles.root}>
        <Text style={styles.title}>Inicio de Sesion</Text>
        <CustomInput
            placeholder="Ingresa tu correo electrónico"
            //onChangeText={(text) => setEmail(text)}
            setValue = {setEmail}
            value={email}
            secureTextEntry={false}
        />
        <CustomInput
            placeholder="Ingresa tu contraseña"
            //onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            setValue = {setPassword}
            value={password}
        />
        <CustomButton
          text="Iniciar Sesion" 
          onPress={loginMessage}
          bgColor = 'orange'
          fgColor = 'white'
        />
        <CustomButton
          text="Registrarse" 
          onPress={create}
          bgColor = 'orange'
          fgColor ='white'
        />
    </View>
    );
  }

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
     color: 'orange',
     fontWeight: 'bold',

  }
})

export default LoginForm;
    