import { CarRoutes } from '@routes/CarRoute';

const API = '/api';

export default (app) => {
  app.use(API, CarRoutes);

  app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message });
    next(error);
  });
};