import axios from 'axios';


export const instance = axios.create({
    baseURL: 'https://healthbackend-2kaw.onrender.com/api/'
})


instance.interceptors.request.use((config) => {
    console.log({ config })

    return config
}, (error) => {
    console.log({ error })
    return Promise.reject(error)
})

