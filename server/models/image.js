import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    download_url: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    favourites: {
        type: [String],
        default: []
    },
});

const Image = new mongoose.model('Image', imageSchema);

export default Image;