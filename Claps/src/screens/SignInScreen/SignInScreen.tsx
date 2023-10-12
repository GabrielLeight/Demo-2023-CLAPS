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
function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const submitForm = (event: React.FormEvent) => {
      
      //event.preventDefault();
      // Add your form submission logic here
    };

    const SignInMessage = () => {
      console.warn('Iniciando sesión');
    };
    
    return (
      <View style ={styles.root}>
        <Text style={styles.title}>Inicio de Sesion</Text>
        <CustomInput
            placeholder="Ingresa tu correo electrónico"
            setValue = {setEmail}
            value={email}
            secureTextEntry={false}
            bgColor = '#ffffff'
        />
        <CustomInput
            placeholder="Ingresa tu contraseña"
            secureTextEntry={true}
            setValue = {setPassword}
            value={password}
            bgColor = '#ffffff'
        />
        <CustomButton
          text="Iniciar Sesion" 
          onPress={SignInMessage}
          bgColor = '#c02437'
          fgColor = 'white'
        />
        <CustomButton
          text="Registrarse" 
          onPress={SignInMessage}
          bgColor = '#c02437'
          fgColor ='white'
        />
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
     color: '#c02437',
     fontSize: 20,
     fontWeight: 'bold',

  }
})

export default SignInScreen;
    