import express from 'express';
const router = express.Router();

import {checkExists , signUp , login , getList} from '../controllers/controller.js';

router.post('/checkUserExists',checkExists);
router.post('/signup',signUp);
router.post('/login',login);
router.get('/getList',getList);

export default router