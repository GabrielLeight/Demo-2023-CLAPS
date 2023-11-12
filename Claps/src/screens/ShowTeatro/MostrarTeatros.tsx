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
        <Text style={styles.title}>Theaters</Text>
        <FlatList
            data={theaters}
            keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            renderItem={({ item }) => (
                <View style={styles.theaterCard}>
                    {item ? (
                        <Text>{item.username}</Text>
                        // Render other theater information here
                    ) : (
                        <Text>Error: Invalid Data</Text>
                    )}
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
        borderWidth: 10,
        borderColor: 'gray',
        padding: 10,
        margin: 5,
    },
});

export default ShowTeatro;