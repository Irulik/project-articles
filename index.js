import express from "express";
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";

import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB ok"))
  .catch(err => console.log("DB error", err));

const app = express();

//створюю сховище для зберігання картинок 
const storage = multer.diskStorage({
    destination: (_, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/register",  registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);


app.listen(process.env.PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
