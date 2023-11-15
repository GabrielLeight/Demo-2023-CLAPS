import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

export default function getPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);
                resolve({ latitude, longitude });
            },
            (error) => {
                console.error('Error getting location:', error);
                reject(error);
            }
        );
    });
}
