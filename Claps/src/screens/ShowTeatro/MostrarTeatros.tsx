import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import getAuthToken from '../authToken/getAuthToken';
import client from '../../components/client';

const ShowTeatro: React.FC = () => {
    const [theaters, setTheaters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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


    return (
        <View style={styles.root}>
            <FlatList
                data={theaters}
                keyExtractor={(item) => (item.titulo ? item.titulo.toString() : Math.random().toString())}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={styles.label}>Theater: <Text style={styles.text}>{item.teatro}</Text></Text>
                        

                        <Text style={styles.label}>Synopsis:</Text>
                        <Text style={styles.text}>{item.sinopsis}</Text>

                        <Text style={styles.label}>Trailer URL:</Text>
                        <Text style={styles.text}>{item.trailer_url}</Text>

                        <Text style={styles.label}>Show Date:</Text>
                        <Text style={styles.text}>{item.fecha_show}</Text>

                        {/* Add more attributes as needed */}

                        {/* Render other theater information here */}
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f8fa',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'red',
    },
    container: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        margin: 10,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
      },
      text: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
      },
});

export default ShowTeatro;