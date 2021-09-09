import { Car } from '@models/Car';

export class CarPage {
  pageSize: number;
  pageTotal: number;
  page: number;
  total: number;
  data: Car[];
}