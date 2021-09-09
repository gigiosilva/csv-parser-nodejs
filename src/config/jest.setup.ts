import '@tests/mocks/typeorm';
import Server from '../server';

afterAll(async () => {
  await Server.server.close();
  await new Promise((resolve) => setTimeout(() => resolve(null), 500)); // avoid jest open handle error
});