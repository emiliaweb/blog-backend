import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'At least 5 characters').isLength({ min: 5 }),
    body('fullName', 'At least 3 characters').isLength({ min: 3 }),
    body('avatarUrl', 'Invalid URL').optional().isURL(),
]

export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'At least 5 characters').isLength({ min: 5 }),
]