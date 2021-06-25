import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import Image from "../models/image.js";

export const getImages = async (req, res) => {
  try {
    const page = req.body.page;
    const allImages = await Image.find().skip(10 * (page - 1)).limit(10);
    res.status(200).json(allImages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Oops, couldn't fetch your images." });
  }
};

export const addImages = async (req, res) => {
  try {
    const imageArray = req.body;
    await Image.insertMany(imageArray);
    res.status(201).json({ result: imageArray });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Oops, couldn't add your images." });
  }
};

export const favoriteImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Oops! No post with that id.");

    const token = req.body.token;
    const decodedData = jwt.decode(token);
    req.userId = decodedData?._id;
    if (!req.userId) return res.json({ message: "Unauthenticated!" });

    const currentImage = await Image.findById(id);
    const index = currentImage.favourites.findIndex(
      (id) => id === String(req.userId)
    );

    if (index === -1) currentImage.favourites.push(req.userId);
    else
      currentImage.favourites = currentImage.favourites.filter(
        (id) => id !== String(req.userId)
      );

    const updatedImage = await Image.findByIdAndUpdate(id, currentImage, {
      new: true,
    });
    res.status(210).json(updatedImage);
  } catch (error) {
    console.log(error);
    res.status(404).send("Could not favorite that image.");
  }
};
