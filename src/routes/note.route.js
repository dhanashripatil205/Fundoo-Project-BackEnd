import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/createnote', noteValidator, noteController.createnewNote);

//route to get a single user by their user id
router.get('/:_id', noteController.getnewNote);

//route to update a single user by their user id
router.put('/:_id', noteController.updateNote);

//route to delete a single user by their user id
router.delete('/:_id', noteController.deleteNote);

export default router;
