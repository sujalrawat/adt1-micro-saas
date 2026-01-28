import axios from "axios";

const api = axios.create({
    baseURL:"https://adt1-micro-saas.onrender.com/api"
})

export default api;
