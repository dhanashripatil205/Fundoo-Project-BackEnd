import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


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

//forget Password Operation

export const forgetPwd = async (req, res, next) => {
  try {
    const data = await UserService.forgetPwd(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Email has been successfully send to the mail id'
    });
  } catch (error) {
    next(error)
  }
};

//reset Password Operation

export const resetPwd = async (req, res, next) => {
  try {
    await UserService.resetPwd(req.body.userId, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Password has been reset succesfully'
    });
  } catch(error) {
    next(error)
  }
};
