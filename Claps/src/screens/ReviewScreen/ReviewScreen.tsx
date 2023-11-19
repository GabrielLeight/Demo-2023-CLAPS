import React, { useRef, useState,useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet,Image, Animated,  Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
const Logo = '../../../assets/images/rana2.png';
interface ReviewScreenProps {
	itemId: number;
	// Add other necessary properties here based on your actual use case
  }
const ReviewScreen: React.FC = () => {
    const [id_show, setshowName] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(1); // Default rating
    const [comments, setComments] = useState('');
	const scrollY = useRef(new Animated.Value(0)).current;
	const route = useRoute();
	const params = route.params as ReviewScreenProps | undefined;
	const spinValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
	  // Spinning animation
	  Animated.loop(
		Animated.timing(spinValue, {
		  toValue: 1,
		  duration: 5000, // Adjust the duration as needed
		  useNativeDriver: true,
		})
	  ).start();
  
	  // Scrolling animation
	  const loopAnimation = Animated.loop(
		Animated.sequence([
		  Animated.timing(scrollY, {
			toValue: 1,
			duration: 5000, // Adjust the duration as needed
			useNativeDriver: true,
		  }),
		  Animated.timing(scrollY, {
			toValue: 0,
			duration: 5000, // Adjust the duration as needed
			useNativeDriver: true,
		  }),
		])
	  );
  
	  loopAnimation.start();
		// Don't forget to clean up the animation when the component unmounts
		return () => {
			loopAnimation.stop();
			spinValue.setValue(0);
		  };
		}, [scrollY, spinValue]);
		const spin = spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg'],
		  });
	  const translateY = scrollY.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 400], // Adjust the distance to scroll
	  });
	const Enviar = async () => {
		try {
		const response = await axios.post('newReview', {
			id_show: params?.itemId,
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
		<View style={styles.root}>

		<Animated.Image style={[styles.wrapper,  { transform: [{ translateY }, { rotate: spin }] }]} source = {require(Logo)} />
		 <Text>¡De rienda suelta a sus emociones!</Text> 
		<CustomInput
		  placeholder=""
		  secureTextEntry={false}
		  setValue={() => {}} // Add your implementation
		  value=""
		  bgColor="#ffffff"
		/>
		<CustomInput
		  placeholder="Rating"
		  secureTextEntry={false}
		  setValue={() => {}} // Add your implementation
		  value=""
		  bgColor="#ffffff"
		/>
		<CustomButton
		  text="Enviar"
		  onPress={() => {}} // Add your implementation
		  bgColor="#FAE9EA"
		  fgColor="#DD4D44"
		/>
	 	</View>
	);
};
const styles = StyleSheet.create({
	wrapper: {
	  background: '#111111',
	  color: '#eee',
	  height: 300, // Adjust the height as needed
	  minWidth: 360,
	  width: '100%',
	  display: 'flex',
	  justifyContent: 'center',
	  alignItems: 'center',
	  perspective: '1000px',
	  perspectiveOrigin: '50% 50%',
	},
	root: {

		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f6f8fa',
	},
  });
export default ReviewScreen;