import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import dotenv from 'dotenv'

import { registerValidation } from './validations/auth.js';
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";

dotenv.config();

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Database: OK')
    })
    .catch((error) => {
        console.log('Database: error', error)
    })

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login)
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(4444, (error) => {
    if (error) {
        console.log(error)
    }
    console.log('Server: OK')
});