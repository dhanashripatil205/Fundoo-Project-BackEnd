import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).regex(/^[A-Z]{1}[A-Za-z]{2,}$/).required(),
    lastname: Joi.string().min(4).regex(/^[A-Z]{1}[A-Za-z]{2,}$/).required(),
    email: Joi.string().min(4).regex(/^[A-Za-z0-9]+([.+-][A-Za-z0-9]+)*@[A-Za-z0-9]+[.][a-z]{2,}$/).required(),
    password: Joi.string().regex(/^.*(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/).required(),
    confirmpassword: Joi.string().regex(/^.*(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/).required()


  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
