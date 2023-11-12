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
                    <View style={styles.theaterCard}>
                        <Text style={styles.title}>Title: {item.titulo}</Text>

                        <Text >Theater:</Text>
                        <Text>{item.teatro}</Text>

                        <Text >Synopsis:</Text>
                        <Text>{item.sinopsis}</Text>

                        <Text >Trailer URL:</Text>
                        <Text>{item.trailer_url}</Text>

                        <Text >Show Date:</Text>
                        <Text>{item.fecha_show}</Text>

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
    theaterCard: {
        borderWidth: 1,
        borderColor: 'yellow',
        padding: 10,
        margin: 5,
    },
});

export default ShowTeatro;