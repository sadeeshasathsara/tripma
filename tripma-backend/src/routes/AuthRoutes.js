import express from 'express'
import { registerByEmail, registerByGoogle } from '../controllers/register.controller.js'
import { loginByEmail, loginByGoogle } from '../controllers/login.controller.js'

import multer from 'multer';

const router = express.Router()

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/profile_pictures');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

//Register routes
router.post('/reg/email', upload.single('profilePicture'), registerByEmail)
router.post('/reg/google', registerByGoogle)

//Login Routes
router.post('/log/email', loginByEmail)
router.post('/log/google', loginByGoogle)

export default router