import { AUTHENTICATE } from '../constants/actionTypes';
import * as api from '../api/index';

export const login = (formData, history) => async (dispatch) => {
    try {
        const payload = await api.login(formData);
        dispatch({ type: AUTHENTICATE, payload });

        history.push('/home');        
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        const payload = await api.signup(formData);
        dispatch({ type: AUTHENTICATE, payload });

        history.push('/home');   
    } catch (error) {
        console.log(error);
    }
};