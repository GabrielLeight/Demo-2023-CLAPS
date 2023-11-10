import React, { useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const ReviewScreen: React.FC = () => {
    const [id_show, setshowName] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(1); // Default rating
    const [comments, setComments] = useState('');

	const Enviar = async () => {
		try {
		const response = await axios.post('newReview', {
			id_show: id_show,
			performanceTitle: author,
			rating: rating,
			cuerpo_crit: comments,
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
			<Text>¡De rienda suelta a sus emociones!</Text>
			<CustomInput
				placeholder=""
				secureTextEntry={false}
				setValue = {setComments}
				value={comments}
				bgColor = '#ffffff'	
			/>			
			<CustomInput
				placeholder="Rating"
				secureTextEntry={false}
				setValue = {setRating}
				value={rating}
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