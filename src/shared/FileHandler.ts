import csv from 'csv-parser';
import fs from 'fs';

class FileHandler {
  async parseCsv(file, separator?: string) {
    return new Promise((r) => {
      const results: Object[] = [];
      fs.createReadStream(file.path)
        .pipe(csv({
          separator: separator || ';',
        }))
        .on('data', (data) => {
          // set all keys to lowercase
          data = Object.keys(data)
            .reduce((destination, key) => {
              destination[key.toLowerCase()] = data[key];
              return destination;
            }, {});
          results.push(data);
        })
        .on('end', () => {
          r(results);
        });
    });
  }
}

export default new FileHandler();