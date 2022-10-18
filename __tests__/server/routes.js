const request = require('supertest');
const server = 'http://localhost:3000';

describe('route integration', () => {
    // describe('auth routes', () => {

    // });
    // describe('room routes', () => {
        
    // });
    describe('user routes', () => {
      describe('/api/users/', () => {
        describe('GET', () => {
          it('responds with 200 status and responds with json user object', async () => {
            const response = await request(server)
              .get('/api/users/')
            expect(200);
            expect(response.headers["content-type"]).toMatch(/application\/json/);
          });
        });
        describe('POST', () => {
          it('responds with 200 status and responds with json user object', async () => {
            const response = await request(server)
              .get('/api/users/')
            expect(200);
            expect(response.headers["content-type"]).toMatch(/application\/json/);
          });
        });
        describe('DELETE', () => {
          it('responds with 200 status, responds with json user object', async () => {
            const response = await request(server)
              .get('/api/users/')
            expect(200);
            expect(response.headers["content-type"]).toMatch(/application\/json/);
          });
        });
      }); 
    });
});