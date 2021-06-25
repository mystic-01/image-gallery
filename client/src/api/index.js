import axios from 'axios';

const API = axios.create({ baseURL: 'https://image-gallery-diatoz.herokuapp.com' });

API.interceptors.request.use(req => {
    if (localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }
    return req;
});

export const getImages = (page) => API.post('/image', {page});
export const favoriteImage = (id, token) => API.patch(`/image/${id}`, {token});

export const login = (formData) => API.post('/user/login', formData);
export const signup = (formData) => API.post('/user/signup', formData);