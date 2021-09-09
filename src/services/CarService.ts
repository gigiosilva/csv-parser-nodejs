import csv from 'csv-parser';
import fs from 'fs';
import fsExtra from 'fs-extra';
import { getRepository, Repository } from 'typeorm';
import { Car } from '@models/Car';
import { CarPage } from '@models/CarPage';
import CarValidator from '@validators/CarValidator';
import Helper from '../shared/Helper';

class CarService {
  async getCars(pageSize: number = 20, page: number = 1): Promise<CarPage> {
    const carRepository: Repository<Car> = getRepository(Car);

    const total: number = await carRepository.count();

    const cars: Car[] = await carRepository.find({
      take: pageSize,
      skip: pageSize * (page - 1),
    });

    const carPage: CarPage = new CarPage();
    carPage.total = total;
    carPage.data = cars;
    carPage.page = page;
    carPage.pageSize = pageSize;
    carPage.pageTotal = Math.ceil(total / pageSize);

    return carPage;
  }

  async parseAndInsertCsv(file, provider: string, separator?: string) {
    const carRepository: Repository<Car> = getRepository(Car);

    fs.createReadStream(file.path)
      .pipe(csv({
        separator: separator || ';',
      }))
      .on('data', async (data) => {
        data = Helper.lowerObjKeys(data);
        data = CarValidator.validateObject(data);
        data.provider = provider;
        carRepository.save(data);
      })
      .on('end', () => {
        fsExtra.emptyDirSync('uploads');

        // Here we can add a logic to inform the end of file processing (webhook, socketio, etc)
      });
  }
}

export default new CarService();