import AsyncStorage from "@react-native-async-storage/async-storage";
const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token !== null) {
        // Token found, you can use it as needed
        console.log('Token:', token);
      } else {
        // Token not found
        console.log('Token not found');
      }
    } catch (error) {
      // Error retrieving data
      console.error(error);
    }
  };
export default getAuthToken