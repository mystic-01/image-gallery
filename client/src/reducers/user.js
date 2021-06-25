import { AUTHENTICATE, LOGOUT } from '../constants/actionTypes';

const userReducer = (state = { userData: null }, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            localStorage.setItem('user', JSON.stringify({ ...action?.payload }));
            return { ...state, userData: action?.payload };
        case LOGOUT:
            localStorage.clear();
            return { ...state, userData: null };
        default:
            return state;
    }
};

export default userReducer;