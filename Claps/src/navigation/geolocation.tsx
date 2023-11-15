import Geolocation from '@react-native-community/geolocation';


function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        Geolocation.getCurrentPosition(info => console.log(info));
    });
}
