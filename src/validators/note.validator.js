import Joi from '@hapi/joi';

export const noteValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    description: Joi.string().min(4).required(),
    userid: Joi.string().required(),
    archieve: Joi.boolean().default(0).optional(),
    trash: Joi.boolean().default(0).optional(),
    color: Joi.string().min(4).optional(),



  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
