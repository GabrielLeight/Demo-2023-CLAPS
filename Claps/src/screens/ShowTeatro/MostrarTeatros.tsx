import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import getAuthToken from '../authToken/getAuthToken';
import client from '../../components/client';
import { HomeScreen } from '../../navigation';
import cambiarFecha from '../../components/formatFecha/formatFecha';
import YoutubeIframe from 'react-native-youtube-iframe';
import urlToID from '../../components/urltoID/urltoID';

import getPosition from '../../components/getPosition/getPosition';
import { RootStackParamList } from '../types/types';
type YourComponentProps = {
    item: { id: number; /* other properties */ };
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
    const handleReviewPress = (item: YourComponentProps['item']) => {
        // Navigate to the review screen and pass the item ID as a parameter
        if (item) {
            navigation.navigate('ReviewScreen', { itemId: item.id });
          }
      };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAuthToken();

                const response = await client.get('getShows', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTheaters(response.data);
            } catch (error) {
                console.error('Failed to fetch theaters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                         <TouchableOpacity onPress={() => handleReviewPress(item)}>
                            <Text style={styles.reviewLink}>¡Registra una crítica a esta obra!</Text>
                        </TouchableOpacity>
                    </View>
                )}
            /> 
            
        </View>
       
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f6f8fa',
    },
    background: {
        backgroundColor: 'red',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
    },
    container: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        margin: 10,
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