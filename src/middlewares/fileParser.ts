import { NextFunction, Request, Response } from 'express';
import fsExtra from 'fs-extra';
import FileHandler from '../shared/FileHandler';

const fileParser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      const { provider } = req.body;
      // get parsed csv
      req.body = await FileHandler.parseCsv(req.file);
      // add provider to all objs
      req.body = req.body.map((obj) => ({ ...obj, provider }));
      // remove local files
      fsExtra.emptyDirSync('uploads');
    }

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Failed to parse file' });
  }
};

export default fileParser;