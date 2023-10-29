import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import dotenv from 'dotenv';

import UserModel from "../models/User.js";

dotenv.config();

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        });

        const user = await doc.save();

        const { passwordHash, ...data } = user._doc;

        res.json({
            ...data
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to register'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isValidPw = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPw) {
            return res.status(400).json({
                message: 'Incorrect email or password'
            })
        }

        const { passwordHash, ...data } = user._doc

        const token = jwt.sign({
            _id: user._id
        }, process.env.SECRET_KEY, {
            expiresIn: '30d'
        })

        res.json({
            ...data,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to log in'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const { passwordHash, ...data } = user._doc;

        res.json({
            ...data
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'No access'
        })
    }
}