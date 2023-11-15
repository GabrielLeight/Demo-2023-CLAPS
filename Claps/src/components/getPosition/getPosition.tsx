import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

export default function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        Geolocation.getCurrentPosition(info => console.log(info));
    });
}
