import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userAuth,noteController.getallNotes);

router.post('', noteValidator ,userAuth,noteController.createnewNote);

router.get('/:_id', userAuth, noteController.getnewNote);

router.put('/:_id', userAuth, noteController.updateNote);

router.delete('/:_id', userAuth,noteController.deleteNote);

router.put('/:_id/addNoteInTrash' , userAuth, noteController.addNoteInTrash);

router.put('/:_id/removeNoteFromTrash' , userAuth, noteController.removeNoteFromTrash);

router.put('/:_id/addNoteInArchive' , userAuth, noteController.addNoteInArchive);

router.put('/:_id/removeNoteFromArchive' , userAuth, noteController.removeNoteFromArchive);

export default router;
