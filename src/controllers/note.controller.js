import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

/**
 * Controller to get all notes available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

//Controller to get notes based on user id

export const getallNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getallNotes(req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

//get single note

export const getnewNote = async (req, res, next) => {
  try {
    const data = await NoteService.getnewNote(req.params._id, req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note has been successfully fetched inside the Database.'
    });
  } catch (error) {
    next(error);
  }
};
//Create new note

export const createnewNote = async (req, res, next) => {
  try {
    const data = await NoteService.createnewNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note has been successfully created inside the Database. '
    });
  } catch (error) {
    next(error);
  }
};

//Update new note

export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params._id,req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note has been updated successfully inside the Database.'
    });
  } catch (error) {
    next(error);
  }
};

//delete new note

export const deleteNote = async (req, res, next) => {
  try {
    await NoteService.deleteNote(req.params._id, req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note has been deleted successfully from the Database.'
    });
  } catch (error) {
    next(error);
  }
};

//changing the status of archive notes from False to True

export const addNoteInArchive = async (req, res, next) => {
  try {
    const data = await NoteService.addNoteInArchive(req.params._id,req.body.userId);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note added to archive'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      // 400 = bad
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//changing the status of archive notes from True to False

export const removeNoteFromArchive = async (req, res, next) => {
  try {
    const data = await NoteService.removeNoteFromArchive(req.params._id,req.body.userId);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note removed from archive'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      // 400 = bad
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//changing the status of trash notes from False to True

export const addNoteInTrash = async (req, res, next) => {
  try {
    const data = await NoteService.addNoteInTrash(req.params._id,req.body.userId);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note added to trash'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      // 400 = bad
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//changing the status of trash notes from True to False

export const removeNoteFromTrash = async (req, res, next) => {
  try {
    const data = await NoteService.removeNoteFromTrash(req.params._id,req.body.userId);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note removed from trash'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      // 400 = bad
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};


