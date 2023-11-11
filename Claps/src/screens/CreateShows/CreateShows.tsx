import React, { useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text } from 'react-native';
import DatePicker from 'react-native-date-picker'
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const CreateShows: React.FC = () => {
    const [showName, setshowName] = useState('');
    const [nameTeatro, setNameTeatro] = useState('');
    const [company, setCompany] = useState('');
    const [sinopsis, setSinopsis] = useState(''); // Default rating
    const [trailer, setTrailer] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [open, setOpen] = useState(false)
  
	const Enviar = async () => {
		try {
		const response = await axios.post('newShow', {
			titulo: showName,
			sinopsos: sinopsis,
			trailer_url: trailer,
			fecha_show: fecha,
			is_active: true, // Set this as needed
		});

		// hacer navegacion a pagina principal (o de usuario)
		console.log('User registered:', response.data);
		} catch (error) {
		// mostrar mensaje en pantalla de datos incorrectos?
		}
	};
	return (
		<View style ={styles.root}>
			<Text>¡Exponga su obra!</Text>
			<CustomInput
				placeholder="Titulo"
				secureTextEntry={false}
				setValue = {setshowName}
				value={showName}
				bgColor = '#ffffff'
			/>
            <Text>¡Explique de que trata su obra!</Text>
			<CustomInput
				placeholder=""
				secureTextEntry={false}
				setValue = {setSinopsis}
				value={sinopsis}
				bgColor = '#ffffff'	
			/>
            <CustomInput
				placeholder="Inserte Link de Trailer (opcional)"
				setValue = {setTrailer}
				value={trailer}
				secureTextEntry={false}
				bgColor = '#ffffff' 
			/>
            <Text>Inserte fecha de estreno:</Text>
            <DatePicker
                open={open}
                date={fecha}
                onConfirm={(date) => {
                setOpen(false)
                setFecha(date)
                }}
                onCancel={() => {
                setOpen(false)
                }}
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
    
inputContainer:{
	marginHorizontal: 2,
	flex: 1,
},

flexRow: {
	flexDirection: 'row', // Esto hará que los elementos se alineen en una fila horizontal
	alignItems: 'center',// Esto alineará los elementos verticalmente en el centro
	justifyContent: 'center',
},

title: {
	color: '#266797',
	fontSize: 20,
	fontWeight: 'bold',
	marginBottom: 3,
},

input:{
	color: 'rgb(169, 27, 13)',
	textAlign: 'center',
},
	
	})
export default CreateShows;