import axios from 'axios';

const client  = axios.create({
    baseURL: "https://f4a1-2800-150-140-1edf-b002-21a8-34a5-107f.ngrok-free.app/"
})

export default client