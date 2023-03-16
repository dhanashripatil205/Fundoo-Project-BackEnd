import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// //route to create a new user
router.post('', newUserValidator, userAuth, userController.userRegistration);

//route to get a single user by their user id
router.get('/login', userAuth, userController.userLogin);

export default router;
