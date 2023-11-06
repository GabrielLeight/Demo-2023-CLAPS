import React, { useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const ReviewScreen: React.FC = () => {
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
	const Enviar = async () => {
		try {
		const response = await axios.post('YOUR_API_ENDPOINT', {
			criticName,
			performanceTitle,
			rating: rating,
			comments: comments,
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
		<View style ={styles.root}>
			<Text>Review</Text>
			<CustomInput
				placeholder="Rating"
				secureTextEntry={true}
				setValue = {setRating}
				value={rating}
				bgColor = '#ffffff'
			/>
			<CustomInput
				placeholder="InserteComentarios finales"
				secureTextEntry={true}
				setValue = {setComments}
				value={comments}
				bgColor = '#ffffff'	
			/>
			<CustomButton
				text="Enviar" 
				onPress={Enviar}
				bgColor = "#FAE9EA"
				fgColor ="#DD4D44"
			/>
	</View>
	);
};
const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f6f8fa',
	},
	
	})
export default ReviewScreen;