import axios from 'axios';

const client  = axios.create({
    baseURL: "https://3634-2800-150-140-1edf-25b3-fdbc-86bb-250b.ngrok-free.app"
})

export default client