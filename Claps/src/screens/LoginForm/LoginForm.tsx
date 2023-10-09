import React,  { useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import {styles} from '../../../App';

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
  
    return (
      <View>
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
        <TouchableOpacity style={styles.button}>
            <Text>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={create}>
            <Text>Registrarse</Text>
        </TouchableOpacity>
    </View>
    );
  }

export default LoginForm;
    