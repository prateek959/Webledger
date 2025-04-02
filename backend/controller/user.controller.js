import User from "../models/user.model.js";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = await User.findOne({ email });
        if (data) {
            return res.status(400).json({ msg: "User is already exists" });
        }
        const hashPass = await argon2.hash(password);
        await User.create({
            username,
            email,
            password: hashPass
        });
        res.status(201).json({ msg: "User register successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await User.findOne({ email });
        if (!data) {
            return res.status(400).json({ msg: "Email is invalid" });
        }
        const verify = await argon2.verify(data.password, password);
        if (!verify) {
            return res.status(400).json({ msg: "Password is invalid" });
        }
        const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        res.status(200).json({msg:"User login successfully",token});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export {register, login};