import express from 'express';
const router = express.Router();

import {checkExists , signUp } from '../controllers/controller.js';

router.post('/checkUserExists',checkExists);
router.post('/signup',signUp);

export default router