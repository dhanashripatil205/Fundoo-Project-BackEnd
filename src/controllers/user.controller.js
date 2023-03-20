import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get a single user
//  * @param  {object} req - request object
//  * @param {object} res - response object
//  * @param {Function} next
//  */

//user login is required

export const userLogin = async (req, res, next) => {
  try {
    const data = await UserService.userLogin(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

//user registration is required

export const userRegistration = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
    res.status(HttpStatus.BAD_REQUEST).json({   //400
      code: HttpStatus.BAD_REQUEST,                     
      message: `${error}`
  });
  }
};
