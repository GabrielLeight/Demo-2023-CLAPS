import React, { useState } from 'react';
import { View, StyleSheet,Image,  Text, Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
import getAuthToken from '../authToken/getAuthToken';
import client from '../../components/client';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import ExpandableTextInput from '../../components/CustomInput/ExpandableTextInput';
const Logo = '../../../assets/images/Claps.png';

interface ReviewScreenProps {
	itemId: number;
	titulo: string;
}
const ReviewScreen: React.FC = () => {
    const [rating, setRating] = useState<number>(1); // Calificacion default en 1
    const [comments, setComments] = useState('');
	const route = useRoute();
	const params = route.params as ReviewScreenProps | undefined;
	
	const EnviarCritica = async () => {
		const token = await getAuthToken()
		try {
			const response = await client.post('newReview', {
                id_show: params?.itemId,
                performanceTitle: params?.titulo,
                rating: rating,
                cuerpo_crit: comments,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
			console.log('Crítica enviada:', response.data);
		} catch (error) {
			console.error('Envío fallido de la crítica:', error);
		}
	};

	return (
		<View style={styles.root}>
			<View style={styles.container}>
				<Image style = {styles.tinyLogo} source = {require(Logo)}/>
				<Text style={styles.texto}>¡De rienda suelta a sus emociones!</Text> 
				<Text style={styles.texto}>¿Qué le produjo esta obra?</Text> 
				<ExpandableTextInput
					placeholder=""
					secureTextEntry={false}
					setValue ={setComments}
					value={comments}
					bgColor="#e8fffd"
				/>	
				<Text style={styles.texto}>Del 1 al 5, ¿Que tanto le gustó esta obra?</Text>  
				<CustomInput
					placeholder="Rating"
					secureTextEntry={false}
					setValue ={setRating}
					value={rating}
					bgColor="#e8fffd"
				/>
				<CustomButton
					text="Enviar"
					onPress={EnviarCritica} 
					bgColor="#446c69"
					fgColor="#ffffff"
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	texto: {
		color: 'black',
		fontWeight: '400',
		fontFamily: 'sans-serif',
	},
	root: {
		flex: 1,	
		justifyContent: 'center',
		backgroundColor: '#75b9b4',
	},
	container: {
		padding: 10,
		alignItems: 'center',
		backgroundColor: '#a2d0cd',
		margin: 15,
		borderRadius: 15,
	},
	tinyLogo: {
		width: Dimensions.get('window').width * 0.50, // Ajusta el factor según tus necesidades
		height: Dimensions.get('window').height * 0.1, // Ajusta el factor según tus necesidades
	},
});
export default ReviewScreen;