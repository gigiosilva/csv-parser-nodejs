import { Router } from 'express';
import multer from 'multer';
import CarController from '@controllers/CarController';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    file.mimetype === 'text/csv' ? cb(null, true) : cb(new Error('Only CSV files are allowed'));
  },
});

const router: Router = Router();

router
  .route('/cars')
  .get(CarController.getCars)
  .post(upload.single('data'), CarController.addCars);

export const CarRoutes: Router = router;