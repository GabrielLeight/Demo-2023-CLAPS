import axios from 'axios';

const client  = axios.create({
    baseURL: "https://2a1a-2800-150-140-1edf-25f2-8e65-b2d9-da1b.ngrok-free.app"
})

export default client