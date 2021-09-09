import { Request, Response } from 'express';
import CarService from '@services/CarService';
import { CarPage } from '@models/CarPage';

class CarController {
  async getCars(req: Request, res: Response) {
    const { page = 1, pageSize = 20 } = req.query;
    const cars: CarPage = await CarService.getCars(Number(pageSize), Number(page));
    return res.status(200).json(cars);
  }

  async addCars(req: Request, res: Response) {
    try {
      const { provider } = req.body;
      if (!provider) return res.status(400).json({ error: 'Provider is missing' });
      if (!req.file) return res.status(400).json({ error: 'File is missing' });

      CarService.parseAndInsertCsv(req.file, provider);
      return res.status(200).json({
        message: 'File received',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new CarController();