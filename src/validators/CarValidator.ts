import Joi from 'joi';
import { Car } from '@models/Car';

class CarValidator {
  validateObject(car: Car) {
    const schema = Joi.object({
      vin: Joi.string(),
      make: Joi.string(),
      model: Joi.string(),
      mileage: Joi.string(),
      year: Joi.string(),
      price: Joi.string(),
      zipCode: Joi.string(),
      provider: Joi.string(),
    });

    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { value } = schema.validate(car, options);

    return value;
  }
}

export default new CarValidator();