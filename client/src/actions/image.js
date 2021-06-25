import * as api from "../api";
import { FETCH_ALL, FAVORITE } from '../constants/actionTypes';

export const getImages = (page) => async (dispatch) => {
    try {
        const { data } = await api.getImages(page);
        dispatch({ type: FETCH_ALL, payload: data })
        
    } catch (error) {
        console.log(error);
    }
};

export const favoriteImage = (id, token) => async (dispatch) => {
    try {
        const { data } = await api.favoriteImage(id, token);
        dispatch({ type: FAVORITE, payload: data });

    } catch (error) {
        console.log(error);
    }
};
