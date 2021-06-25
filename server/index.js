import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRoutes from './routes/user.js';
import imageRoutes from './routes/image.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/image', imageRoutes);

app.get('/', (req, res) => {
    res.send("<h1 style=font-family:Algerian;background:gold;margin:0;display:flex;justify-content:center><span>Image gallery API.</span></h1>");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => app.listen(PORT, () => console.log(`<<<---SERVER STARTED ON PORT ${PORT}--->>>`)))
    .catch((error) => console.log(error));