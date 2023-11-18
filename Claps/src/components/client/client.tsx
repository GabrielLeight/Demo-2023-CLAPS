import axios from 'axios';

const client  = axios.create({
    baseURL: "https://8bbe-2800-150-140-1edf-d8a6-c2fc-cd56-1925.ngrok-free.app/"
})

export default client