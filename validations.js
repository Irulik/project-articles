import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password must be at least 5 symbols').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password must be at least 5 symbols').isLength({ min: 5 }),
    body('fullName', 'Please, enter your name').isLength({ min: 3 }),
    body('avatarURL', 'Incorrect link to avatar').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Enter title text').isLength({min: 3}).isString(),
    body('text', 'Enter article text').isLength({ min: 3 }).isString(),
    body('tags', 'Incorrect tag format (specify an array)').optional().isString(),
    body('imageURL', 'Invalid image link').optional().isString(),
];

