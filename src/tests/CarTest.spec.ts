import { getRepository, Repository } from 'typeorm';
import supertest from 'supertest';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';
import { Car } from '@models/Car';
import FileHandler from '../shared/FileHandler';
import Server from '../server';
import { carsHalfMock, carsFullMock } from './mocks/data';

const carRepoMock = mock<Repository<Car>>();
const carsRepoMock = mock<Repository<Car[]>>();

describe('** CAR ROUTES **', () => {
  describe('POST /cars', () => {
    it('should add an array of cars via csv', async () => {
      carsRepoMock.save.mockResolvedValue(carsHalfMock);
      when(getRepository).calledWith(Car).mockReturnValue(carsRepoMock);

      await supertest(Server.app)
        .post('/api/cars')
        .attach('data', `${__dirname}/mocks/data.csv`)
        .expect(200);
    });

    it('should add an array of cars via json', async () => {
      carsRepoMock.save.mockResolvedValue(carsHalfMock);
      when(getRepository).calledWith(Car).mockReturnValue(carsRepoMock);

      await supertest(Server.app)
        .post('/api/cars')
        .send(carsHalfMock)
        .expect(200);
    });

    it('should fail data saving', async () => {
      carsRepoMock.save.mockImplementation(() => {
        throw new Error();
      });
      when(getRepository).calledWith(Car).mockReturnValue(carsRepoMock);

      await supertest(Server.app)
        .post('/api/cars')
        .send(carsHalfMock)
        .expect(500, {
          error: 'Internal server error',
        });
    });

    it('should fail in validation', async () => {
      await supertest(Server.app)
        .post('/api/cars')
        .send({})
        .expect(422);
    });

    it('should fail in file parser', async () => {
      FileHandler.parseCsv = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await supertest(Server.app)
        .post('/api/cars')
        .attach('data', `${__dirname}/mocks/data.csv`)
        .expect(400);
    });
  });

  describe('GET /cars', () => {
    it('should return all cars', async () => {
      carRepoMock.find.mockResolvedValue(carsFullMock);
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