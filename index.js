import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import dotenv from 'dotenv'

import { registerValidation, loginValidation } from './validations/auth.js';
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import { postCreateValidation } from "./validations/article.js";

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

// app.get('/posts', PostController.getAll);
// app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
// app.delete('/posts/:id', PostController.remove);
// app.patch('/posts/:id', PostController.update);

app.listen(4444, (error) => {
    if (error) {
        console.log(error)
    }
    console.log('Server: OK')
});