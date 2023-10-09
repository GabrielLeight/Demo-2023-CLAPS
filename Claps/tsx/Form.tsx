import React,  { useState }from 'react';
import axios from 'axios';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styles from  './App';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const submitForm = (event: React.FormEvent) => {
      
      //event.preventDefault();
      // Add your form submission logic here
    };
  
    const create = async () =>  { 
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
      <>
        <Text style={styles.title}>LOGIN</Text>
        <TextInput 
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
  
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          value={password}
        />
        <TextInput
          style={styles.input}
  
          placeholder="Enter your first name"
          onChangeText={(text) => setFirstName(text)}
          secureTextEntry={true}
          value={firstName}
        />
        <TextInput
          style={styles.input}
  
          placeholder="Enter your last name"
          onChangeText={(text) => setLastName(text)}
          secureTextEntry={true}
          value={lastName}
        />
        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={create}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        </>
    );
  }
  
  export {LoginForm};