import { Car } from '@models/Car';
import dayjs from 'dayjs';
import MockDate from 'mockdate';

MockDate.set('2021-08-09');

export const carsHalfMock: Car[] = [
  {
    vin: 'sada546a54s',
    make: 'honda1',
    model: 'civic',
    mileage: '25 kmpl',
    year: '2021',
    price: 'string',
    zipcode: '99950',
    provider: 'Sunset',
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  },
  {
    vin: 'sada546a54s',
    make: 'honda4',
  },
];

export const carsFullMock: Car[] = [
  {
    uuid: '968b9d44-7872-4924-8d95-61d666973aa8',
    vin: 'sada546a54s',
    make: 'honda1',
    model: 'civic',
    mileage: '25 kmpl',
    year: '2021',
    price: 'string',
    zipcode: '99950',
    provider: null,
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  },
  {
    uuid: '2771338b-c34c-4613-b15e-4271d30a788a',
    vin: 'sada546a54s',
    make: 'honda4',
    model: null,
    mileage: null,
    year: null,
    price: null,
    zipcode: null,
    provider: null,
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
  },
];