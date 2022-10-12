const request = require('supertest');
const server = 'http://localhost:3000';

describe('route integration', () => {
    // describe('auth routes', () => {

    // });
    // describe('room routes', () => {
        
    // });
    describe('user routes', () => {
      describe('/api/users/', () => {
        // get
        describe('GET', () => {
          it('responds with 200 status and responds with json user object', async () => {
            const response = await request(server)
              .get('/api/users/')
            expect(200);
            expect(response.headers["content-type"]).toMatch(/application\/json/);

          });
        });
        // post
        describe('POST', () => {
          it('responds with 200 status and responds with json user object', async () => {
            const response = await request(server)
              .get('/api/users/')
            expect(200);
            expect(response.headers["content-type"]).toMatch(/application\/json/);
          });
        });
        // delete
        describe('DELETE', () => {
          it('responds with 200 status, responds with json user object, responds with message object', async () => {
            const response = await request(server)
              .get('/api/users/')
            expect(200);
            expect(response.headers["content-type"]).toMatch(/application\/json/);
            expect(Object.keys(response.body)).toEqual('message');
          });
        });
        // patch
      }); 
    });
});