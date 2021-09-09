import { Request, Response } from 'express';
import { Car } from '@models/Car';
import CarService from '@services/CarService';

class CarController {
  async getCars(req: Request, res: Response) {
    const cars: Car[] = await CarService.getCars();
    return res.status(200).json(cars);
  }

  async addCars(req: Request, res: Response) {
    try {
      const cars: Car[] = await CarService.addCars(req.body);
      return res.status(200).json(cars);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new CarController();