import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const addCarsValidator = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.array().items(
    Joi.object({
      vin: Joi.string(),
      make: Joi.string(),
      model: Joi.string(),
      mileage: Joi.string(),
      year: Joi.string(),
      price: Joi.string(),
      zipCode: Joi.string(),
      provider: Joi.string(),
    }),
  );

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = schema.validate(req.body, options);
  if (error) return res.status(422).json({ error: error.message });

  req.body = value;
  return next();
};