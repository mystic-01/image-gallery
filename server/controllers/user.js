import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await User.findOne({ email });
        if (!result) res.send(404).json({ message: "User not found. Did you mean to sign up?" });

        const isPasswordCorrect = await bcrypt.compare(password, result.password);
        if (!isPasswordCorrect) res.send(404).json({ message: "Credentials do not match. Please try again." });

        const token = jwt.sign({ email: result.email, _id: result._id }, process.env.SECRET, { expiresIn: '2h' });

        res.status(200).json({ ...result, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Don't worry, our team is working 24/7 to resolve this issue." });
    }
};

export const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName, confirmPassword, image } = req.body;
        const result = await User.findOne({ email });
        if (result) return res.status(402).json({ message: "User already exists. Did you mean to log in?" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match." });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ email, image, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: newUser.email, _id: newUser._id }, process.env.SECRET, { expiresIn: '2h' });
        
        res.status(201).json({ ...newUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Please be patient, our team is working 24/7 to resolve this issue." });
    }

};