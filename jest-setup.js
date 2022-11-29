import regeneratorRuntime from 'regenerator-runtime';
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import 'jest-environment-jsdom';

const server = setupServer();

beforeAll(() => {
  server.listen();
  // {
  //   onUnhandledRequest: 'error',
  // }
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

// module.exports = () => {
//   global.testServer = require('./server/server.js');
// };
