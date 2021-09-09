import { Router } from 'express';
import multer from 'multer';
import CarController from '@controllers/CarController';
import { addCarsValidator } from '@middlewares/validators/carValidator';
import fileParser from '@middlewares/fileParser';

const upload = multer({ dest: 'uploads/' });

const router: Router = Router();

router
  .route('/cars')
  .post(upload.single('data'), fileParser, addCarsValidator, CarController.addCars)
  .get(CarController.getCars);

export const CarRoutes: Router = router;