import axios from 'axios';

const client  = axios.create({
    baseURL: "https://d873-2800-150-140-1edf-681d-baa2-9e2a-c858.ngrok-free.app/"
})

export default client