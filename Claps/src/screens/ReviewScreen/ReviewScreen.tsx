import React, { useRef, useState,useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet,Image, Animated,  Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import ExpandableTextInput from '../../components/CustomInput/ExpandableTextInput';
const Logo = '../../../assets/images/teatroxd.png';
interface ReviewScreenProps {
	itemId: number;
	titulo: string;
	// Add other necessary properties here based on your actual use case
  }
const ReviewScreen: React.FC = () => {
    const [id_show, setshowName] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(1); // Default rating
    const [comments, setComments] = useState('');
	
	const route = useRoute();
	const params = route.params as ReviewScreenProps | undefined;
	const scrollY = useRef(new Animated.Value(0)).current;
	const spinValueDown = useRef(new Animated.Value(0)).current;
	const spinValueUp = useRef(new Animated.Value(0)).current;

	useEffect(() => {
	  // Spinning animation
	  Animated.loop(
		Animated.timing(spinValueDown, {
		  toValue: 1,
		  duration: 5000, // Adjust the duration as needed
		  useNativeDriver: true,
		})
	  ).start();
  
	  // Spinning animation for the image going up
	  Animated.loop(
		Animated.timing(spinValueUp, {
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
			spinValueDown.setValue(0);
			spinValueUp.setValue(0);
		  };
		}, [scrollY, spinValueDown, spinValueUp]);


		const spinDown = spinValueDown.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg'],
		  });
		
		  const spinUp = spinValueUp.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '-360deg'], // Negative value for opposite direction
		  });
		  const translateYDown = scrollY.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 400], // Adjust to move down
		  });
		
		  const translateYUp = scrollY.interpolate({
			inputRange: [0, 1],
			outputRange: [0, -400], // Adjust to move up
		  });
	const Enviar = async () => {
		try {
		const response = await axios.post('newReview', {
			id_show: params?.itemId,
			performanceTitle: params?.titulo,
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

		<Animated.Image style={[styles.wrapper,  { transform:  [{ translateY: translateYDown }, { rotate: spinDown }]  }]} source = {require(Logo)} />
		 	<Text>¡De rienda suelta a las emociones que le trajo esta obra!</Text> 
		<ExpandableTextInput
			placeholder=""
			secureTextEntry={false}
			setValue ={setComments}
			value={comments}
			bgColor="#ffffff"
		/>	
			<Text>Del 1 al 5, ¿Que tanto le gustó esta obra?</Text> 
		<CustomInput
			placeholder="Rating"
			secureTextEntry={false}
			setValue ={setRating}
			value={rating}
			bgColor="#ffffff"
		/>

		<CustomButton
		  text="Enviar"
		  onPress={Enviar} // Add your implementation
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

		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f6f8fa',
	},
  });
export default ReviewScreen;