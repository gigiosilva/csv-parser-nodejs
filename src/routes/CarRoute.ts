import { Router } from 'express';
import multer from 'multer';
import CarController from '@controllers/CarController';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router: Router = Router();

router
  .route('/cars')
  .get(CarController.getCars)
  .post(upload.single('data'), CarController.addCars);

export const CarRoutes: Router = router;