import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import getAuthToken from '../authToken/getAuthToken';
import client from '../../components/client';
import cambiarFecha from '../../components/formatFecha/formatFecha';
import YoutubeIframe from 'react-native-youtube-iframe';
import urlToID from '../../components/urltoID/urltoID';
import getPosition from '../../components/getPosition/getPosition';
import { RootStackParamList } from '../types/types';
import CustomButton from '../../components/CustomButton';

interface Theater {
    id_show: number;
    titulo: string;
    teatro :  string;
    sinopsis :  string;
    trailer_url : string;
    fecha_show : Date;
    latitude: number;
    longitude: number;
    distance: number;
}
type YourComponentProps = {
    item: { 
        id_show: number; 
        titulo: string;
    };
    navigation: StackNavigationProp<RootStackParamList, 'YourComponent'>;
  };
type YourComponentNavigationProp = StackNavigationProp<RootStackParamList, 'YourComponent'>;
const ShowTeatro: React.FC = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [theaters, setTheaters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<YourComponentNavigationProp>();
    
    getPosition().then(({ latitude, longitude }: { latitude: number; longitude: number }) => {
        // Do something with latitude and longitude
        setLatitude(latitude);
        setLongitude(longitude);
    }).catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
		// Function to calculate distance between two sets of coordinates using Haversine formula
		const R = 6371; // Radius of the Earth in kilometers
		const dLat = (lat2 - lat1) * (Math.PI / 180);
		const dLon = (lon2 - lon1) * (Math.PI / 180);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;

		return distance;
	};
    const handleReviewPress = (item: YourComponentProps['item']) => {
        // Navigate to the review screen and pass the item ID as a parameter
		if (item) {
			navigation.navigate('ReviewScreen', { itemId: item.id_show,  titulo: item.titulo});
		}
    };
    useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await getAuthToken();
				const response = await client.get<Theater[]>('getShows', {
					headers: {
					Authorization: `Bearer ${token}`,
					},
				});
				// Calculate distances and sort theaters based on proximity to your position
				const theatersWithDistances = response.data.map((theater: Theater) => ({
					...theater,
					distance: calculateDistance(latitude, longitude, theater.latitude, theater.longitude),
				}));
		
				const sortedTheaters = theatersWithDistances.sort((a: Theater, b: Theater) => a.distance - b.distance);
				setTheaters(sortedTheaters);
			} catch (error) {
			    console.error('Failed to fetch theaters:', error);
			} finally {
			    setLoading(false);
			}
		};
      	fetchData();
    }, [latitude, longitude]);

    const [playing, setPlaying] = useState(false)
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Eventos</Text>
            <FlatList
                data={theaters}
                keyExtractor={(item) => (item.titulo ? item.titulo.toString() : Math.random().toString())}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={styles.text}>{cambiarFecha(item.fecha_show)}</Text>
                        <Text style={styles.label}>"{item.titulo}"</Text>
                        <Text style={styles.label2}>Teatro {item.teatro}</Text>
                        <Text style={styles.text}>{item.sinopsis}</Text>
                        <YoutubeIframe
                            videoId = { urlToID(item.trailer_url) }
                            height={200}
                            play={playing}
                        />
                        
                        <CustomButton
                            text="¡Registra una crítica a esta obra aquí!" 
                            onPress={() => handleReviewPress(item)}
                            bgColor = 'transparent'
                            fgColor = '#75b9b4'
					    />
                    </View>
                )}
            /> 
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#75b9b4', //75b9b4
        
    },
    background: {
        backgroundColor: 'red',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#ffffff',
        backgroundColor: '#18827a',
        textAlign: 'center',
        padding: 10,
        marginBottom: 5,
    },
    container: {
        padding: 10,
        backgroundColor: '#e8fffd',
        borderRadius: 8,
        margin: 15,
        marginHorizontal: 29
      },
      label: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
      },
      text: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
      },
      label2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      reviewLink: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
});

export default ShowTeatro;