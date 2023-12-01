import React, { useState } from 'react';
import { View, StyleSheet,Image,  Text, Dimensions} from 'react-native';
import { useRoute, CommonActions } from '@react-navigation/native';
import getAuthToken from '../authToken/getAuthToken';
import client from '../../components/client';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import ExpandableTextInput from '../../components/CustomInput/ExpandableTextInput';
import { useNavigation } from '@react-navigation/native';
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
	const [msg, setMsg] = useState('');
	const navigation = useNavigation();
	const EnviarCritica = async () => {
		const token = await getAuthToken()
		if (rating < 1 || rating > 5) {
			console.error('El rating debe estar entre 1 y 5');
			return;
		}
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
			setMsg("¡Gracias por enviar tu opinión!, puedes volver a los eventos haciendo click aquí")
			
		} catch (error) {
			console.error('Envío fallido de la crítica:', error);
			
		}
	};


	const onEventsPressed = async () => {
		navigation.dispatch(
		  CommonActions.reset({
			index: 0,
			routes: [
			  {
				name: 'HomeScreen',
			  },
			],
		  })
		);
	  };
	return (
		<View style={styles.root}>
			<View style={styles.container}>
				<Image style = {styles.tinyLogo} source = {require(Logo)}/>
				<Text style={styles.texto}>¡De rienda suelta a sus emociones!</Text> 
				<ExpandableTextInput
					placeholder="¿Qué le produjo esta obra?"
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
				{!msg &&
					<CustomButton
						text="Enviar"
						onPress={EnviarCritica} 
						bgColor="#446c69"
						fgColor="#ffffff"
					/>
				}
				{msg && <Text style={{ color: '#006d71' }}>{msg}</Text>}
				{msg &&
					<CustomButton
						text="Ir a eventos"
						onPress={() => onEventsPressed()} 
						bgColor="#2a8c8f"
						fgColor="#ffffff"
					/>
				}
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