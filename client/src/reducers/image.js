import { FETCH_ALL, FAVORITE } from '../constants/actionTypes';

const image = (images = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return [...images, ...action.payload];
        case FAVORITE:
            return images.map(image => image._id === action.payload._id ? action.payload : image);
        default:
            return images;
    }
};

export default image;