import axios from 'axios';

const client  = axios.create({
    baseURL: "https://ZarcoPhage.pythonanywhere.com/"
})

export default client