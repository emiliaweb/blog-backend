import { body } from "express-validator";

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({ min: 3 }).isString(),
    body('text', 'Enter article text').isLength({ min: 3 }).isString(),
    body('tags', 'Incorrect tag format').optional().isString(),
    body('imageUrl', 'Incorrect image URL').optional().isString()
]