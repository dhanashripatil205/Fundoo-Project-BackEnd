import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetAuth } from '../middlewares/resetauth.middleware';


const router = express.Router();

// //route to create a new user
router.post('', newUserValidator, userController.userRegistration);

//route to get a single user by their user id
router.get('', userController.userLogin);

router.post('/forgetPwd', userController.forgetPwd);

router.post('/resetPwd/:token', resetAuth, userController.resetPwd);

export default router;
