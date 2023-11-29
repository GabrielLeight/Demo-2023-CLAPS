import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Alert, Switch} from 'react-native';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import client from '../../components/client';
import getAuthToken from '../authToken/getAuthToken';
import CustomInput from '../../components/CustomInput';
const mask = '../../../assets/images/mask.png';

const UserScreen = () =>{
    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
	const [newusername, setNewusername] = useState<string>('');
	const [newemail,setNewemail] = useState<string>('');
	const [isDeleting, setIsDeleting] = useState(false);
    const navigation = useNavigation();

	const [editable, setEditable] = useState(false);
	const handleChanges = async () => {
		const token = await getAuthToken()
		try {
			const response = await client.post('', { // Agregar aquí el endpoint please!
                username: newusername,
				email: newemail
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
			console.log('Se aplicaron los cambios a la cuenta de forma exitosa:', response.data);
			
			
		} catch (error) {
			console.error('Error al aplicar cambios:', error);
			
		}
	};
  
	const handleSwitchChange = () => {
	  setEditable(!editable);
	};
  
	const handleUsernameChange = (text: string) => {
	  setNewusername(text);
	};

	useEffect(() => {
		retrieveData();
		}, []);

    const retrieveData = async () => {
		const token = await getAuthToken()
		try {
			const user = await client.get(
				"user", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			// console.log("User data from server:", user.data); // En caso de testear
			setUsername(user.data.user.username);
			setEmail(user.data.user.email);
			setNewusername(user.data.user.username);
			setNewemail(user.data.user.email);
			} catch(error){
				console.error("Error retrieving user data:", error);
		}
			
    };

    const Logoff = async () => {
        await AsyncStorage.removeItem('authToken');
        navigation.navigate('SignIn' as never)
    }

    const deleteUser = async () => {
		await client.post(
			"deleteUser",
			{
			username: username
			}
		).then(() => {
			console.log("User deleted");
			AsyncStorage.removeItem('authToken');
			navigation.navigate("SignIn" as never);
		}).catch((Error) => {
			console.error(Error);
		})
    }
	const showDeleteConfirmation = () => {
		Alert.alert(
		  'Confirmación',
		  '¿Estás seguro de que quieres eliminar tu cuenta?',
		  [
			{ text: 'Cancelar', style: 'cancel' },
			{ text: 'Eliminar', onPress: () => handleDeleteAccount() },
		  ],
		  { cancelable: false }
		);
	  };
	
	const showApplyChangesConfirmation = () => {
		Alert.alert(
		  'Confirmación',
		  '¿Estás seguro de que quieres cambiar los datos en tu cuenta?',
		  [
			{ text: 'Cancelar', style: 'cancel' },
			{ text: 'Aplicar cambios', onPress: () => handleChanges() },
		  ],
		  { cancelable: false }
		);
	};

	const handleDeleteAccount = () => {
		// Perform the delete account logic
		setIsDeleting(true); // You can use this state to show a loading indicator if needed
		deleteUser(); // Assuming this function handles the deletion
	};
    return (
      	<View style = {styles.root}>
			<View style = {styles.container}>
				<Image style = {styles.tinyLogo} source = {require(mask)}/>
				<View style = {styles.cuadrado}>
				<Text style = {styles.title}>¡Saludos {username}!</Text>
					<View style = {styles.container2}>
						<Text style={styles.label}>Edit-mode</Text>
						<Switch value={editable} onValueChange={handleSwitchChange} />
					</View>
					{editable ? (
						<View>
							<Text style={styles.texto}>Nombre de usuario:  {username}</Text>
							<CustomInput
							placeholder="Ingresa el nuevo nombre de usuario"
							setValue={setNewusername}
							value={newusername}
							secureTextEntry={false}
							bgColor = '#ffffff'
							/>
							<Text style = {styles.texto}> E-mail: {email}</Text>
							<CustomInput
							placeholder="Ingresa el nuevo email"
							setValue={setNewemail}
							value={newemail}
							secureTextEntry={false}
							bgColor = '#ffffff'
							/>
						</View>
						
						) : (
							<View>
								<Text style={styles.texto}>Nombre de usuario: {username}</Text>
								<Text style = {styles.texto}> E-mail: {email}</Text>
							</View>
					)}
					
					
				</View>	
			</View>
			{( newusername !== username || newemail !== email) &&
					<CustomButton
					text="Aplicar cambios"
					onPress={showApplyChangesConfirmation}
					bgColor="#446c69"
					fgColor="white"
				/>
			}
			
			<CustomButton
				text="Eliminar cuenta"
				onPress={showDeleteConfirmation}
				bgColor="red"
				fgColor="white"
			/>
			<CustomButton
				text="Salir de la cuenta"
				onPress={Logoff}
				bgColor="#FAE9EA"
				fgColor="#DD4D44"
			/>
		</View>
 	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#75b9b4',
		
	},
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	container2: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	title:{
		fontSize: 22,
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
      },
	texto: {
		color: 'black',
		fontSize: 16,
	},
	cuadrado: {
		
		marginVertical: 10,
        backgroundColor: '#e8fffd',
        borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 20,
        
	},
	
	tinyLogo: {
		width: Dimensions.get('window').width * 0.6, // Ajusta el factor según tus necesidades
		height: Dimensions.get('window').height * 0.30, // Ajusta el factor según tus necesidades
	},
})
export default UserScreen;