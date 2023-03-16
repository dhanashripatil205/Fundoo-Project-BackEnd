import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getnewNote = async (req, res, next) => {
  try {
    const data = await NoteService.getnewNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note has been successfully fetched inside the Database.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

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

/**
 * Controller to update a user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */
export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note has been updated successfully inside the Database.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNote = async (req, res, next) => {
  try {
    await NoteService.deleteNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note has been deleted successfully from the Database.'
    });
  } catch (error) {
    next(error);
  }
};
