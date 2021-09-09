import { getRepository, Repository } from 'typeorm';
import { Car } from '@models/Car';

class CarService {
  async getCars() {
    const carRepository: Repository<Car> = getRepository(Car);
    const cars: Car[] = await carRepository.find();

    return cars;
  }

  async addCars(cars: Car[]) {
    const carRepository: Repository<Car> = getRepository(Car);
    return carRepository.save(cars);
  }
}

export default new CarService();