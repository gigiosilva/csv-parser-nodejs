import { getRepository, Repository } from 'typeorm';
import supertest from 'supertest';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';
import { Car } from '@models/Car';
import CarService from '@services/CarService';
import { CarPage } from '@models/CarPage';
import Helper from '@shared/Helper';
import Server from '../server';
import { carsHalfMock, carsFullMock } from './mocks/data';

const carRepoMock = mock<Repository<Car>>();
const carsRepoMock = mock<Repository<Car[]>>();

describe('** CAR ROUTES **', () => {
  describe('POST /cars', () => {
    it('should receive file to process', async () => {
      carsRepoMock.save.mockResolvedValue(carsHalfMock);
      when(getRepository).calledWith(Car).mockReturnValue(carsRepoMock);

      await supertest(Server.app)
        .post('/api/cars')
        .field('provider', 'Teste Provider')
        .attach('data', `${__dirname}/mocks/data.csv`)
        .expect(200);

      await new Promise((r) => setTimeout(r, 1000));
    });

    it('should strip additional columns', async () => {
      carsRepoMock.save.mockResolvedValue(carsHalfMock);
      when(getRepository).calledWith(Car).mockReturnValue(carsRepoMock);

      const lowerObjKeysSpy = jest.spyOn(Helper, 'lowerObjKeys');

      await supertest(Server.app)
        .post('/api/cars')
        .field('provider', 'Teste Provider')
        .attach('data', `${__dirname}/mocks/data_extra_fields.csv`)
        .expect(200);

      await new Promise((r) => setTimeout(r, 1000));

      const lowerObjKeysSpyArgs = lowerObjKeysSpy.mock.calls[0];

      expect(lowerObjKeysSpyArgs[0]).toHaveProperty('teste');
      expect(lowerObjKeysSpyArgs[0]).toHaveProperty('teste1');

      const savedCar = carsRepoMock.save.mock.calls[0];

      expect(savedCar[0]).not.toHaveProperty('teste');
      expect(savedCar[0]).not.toHaveProperty('teste1');
    });

    it('should accept less fields', async () => {
      carsRepoMock.save.mockResolvedValue(carsHalfMock);
      when(getRepository).calledWith(Car).mockReturnValue(carsRepoMock);

      const lowerObjKeysSpy = jest.spyOn(Helper, 'lowerObjKeys');

      await supertest(Server.app)
        .post('/api/cars')
        .field('provider', 'Teste Provider')
        .attach('data', `${__dirname}/mocks/data_less_fields.csv`)
        .expect(200);

      await new Promise((r) => setTimeout(r, 1000));

      const lowerObjKeysSpyArgs = lowerObjKeysSpy.mock.calls[0];

      expect(lowerObjKeysSpyArgs[0]).not.toHaveProperty('MODEL');

      expect(carsRepoMock.save).toBeCalled();
    });

    it('should fail by missing provider', async () => {
      await supertest(Server.app)
        .post('/api/cars')
        .attach('data', `${__dirname}/mocks/data.csv`)
        .expect(400, { error: 'Provider is missing' });
    });

    it('should fail by missing file', async () => {
      await supertest(Server.app)
        .post('/api/cars')
        .field('provider', 'Teste Provider')
        .expect(400, { error: 'File is missing' });
    });

    it('should fail on data saving', async () => {
      CarService.parseAndInsertCsv = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await supertest(Server.app)
        .post('/api/cars')
        .field('provider', 'Teste Provider')
        .attach('data', `${__dirname}/mocks/data.csv`)
        .expect(500, {
          error: 'Internal server error',
        });
    });
  });

  describe('GET /cars', () => {
    it('should return all cars', async () => {
      carRepoMock.find.mockResolvedValue(carsFullMock);
      carRepoMock.count.mockResolvedValue(10);
      when(getRepository).calledWith(Car).mockReturnValue(carRepoMock);

      await supertest(Server.app)
        .get('/api/cars')
        .expect(200);
    });

    it('should fail to general route error', async () => {
      carsRepoMock.find.mockImplementation(() => {
        throw new Error();
      });
      when(getRepository).calledWith(Car).mockReturnValue(carsRepoMock);

      await supertest(Server.app)
        .get('/api/cars')
        .expect(500);
    });
  });
});

describe('** CAR UNIT TESTS **', () => {
  describe('CarService getCars', () => {
    it('should return a CarPage', async () => {
      carRepoMock.find.mockResolvedValue(carsFullMock);
      carRepoMock.count.mockResolvedValue(10);
      when(getRepository).calledWith(Car).mockReturnValue(carRepoMock);
      const carPage: CarPage = await CarService.getCars();

      expect(carPage).toBeInstanceOf(CarPage);
    });
  });
});