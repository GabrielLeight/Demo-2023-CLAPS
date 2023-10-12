import React, { useState } from 'react';
import {styles} from '../../../App';
import { View, TextInput,StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
const TheaterCriticsForm: React.FC = () => {
  const [criticName, setUsername] = useState('');
  const [performanceTitle, setPerformanceTitle] = useState('');
  const [rating, setRating] = useState(5); // Default rating
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here, you can send the form data to your backend or perform any other action.
    // For now, we'll just log the data to the console.
    console.log('Critic Name:', criticName);
    console.log('Performance Title:', performanceTitle);
    console.log('Rating:', rating);
    console.log('Comments:', comments);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(criticName);
      };
    // You can also reset the form fields after submission.
    setUsername('');
    setPerformanceTitle('');
    setRating(5);
    setComments('');
  };

  return (
    <View style ={styles.root}>
        <Text style={styles.title}>Inicio de Sesion</Text>
        <CustomInput
            placeholder="Ingresa tu contraseña"
            secureTextEntry={true}
            setValue = {setRating}
            value={rating}
            bgColor = '#ffffff'
        />
        <CustomInput
            placeholder="Ingresa tu contraseña"
            secureTextEntry={true}
            setValue = {setComments}
            value={comments}
            bgColor = '#ffffff'
        />
        <CustomButton
        text="Registrarse" 
        onPress={create}
        bgColor = "#FAE9EA"
        fgColor ="#DD4D44"
        />
</View>
  );
};
export default TheaterCriticsForm;