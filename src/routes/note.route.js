import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('/', noteController.getallUsers);

//route to create a new user
router.post(' ', noteValidator,userAuth, noteController.createnewNote);

//route to get a single user by their user id
router.get('/:_id', userAuth, noteController.getnewNote);

//route to update a single user by their user id
router.put('/:_id', userAuth, noteController.updateNote);

//route to delete a single user by their user id
router.delete('/:_id', userAuth,noteController.deleteNote);

export default router;
