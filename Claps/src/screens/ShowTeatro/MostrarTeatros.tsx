import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import getAuthToken from '../authToken/getAuthToken';

const ShowTeatro: React.FC = () => {
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = getAuthToken();
    useEffect(() => {
        axios
        .get('getShows') // Replace with your API endpoint
        .then((response) => {
            setTheaters(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Failed to fetch theaters:', error);
            setLoading(false);
        });
    }, []); // Empty dependency array to fetch data only once when the component mounts

    return (
        <View style={styles.root}>
        <Text style={styles.title}>Theaters</Text>
        {loading ? (
            <ActivityIndicator size="large" color="red" />
        ) : (
            <FlatList
            data={theaters}
            keyExtractor={(item:any) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.theaterCard}>
                <Text>{item.name}</Text>
                {/* Render other theater information here */}
                </View>
            )}
            />
        )}
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
        borderColor: 'gray',
        padding: 10,
        margin: 5,
    },
});

export default ShowTeatro;