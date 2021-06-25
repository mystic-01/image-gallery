import express from 'express';

import { getImages, addImages, favoriteImage } from '../controllers/image.js';

const router = express.Router();

router.post('/', getImages);
router.post('/post', addImages);
router.patch('/:id', favoriteImage);

export default router;