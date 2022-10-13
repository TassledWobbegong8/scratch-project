const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

describe("WebSockets", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer(); // creates new http server
    io = new Server(httpServer); // creates new socket.io server

    // listen to httpServer
    httpServer.listen(() => {
      const port = httpServer.address().port; // pulls port number from httpServer
      clientSocket = new Client(`http://localhost:${port}`); // creates new client based on current httpServer port
      
      // on connection, socket server will return socket obj
      // assign socket obj to serverSocket var
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      
      // on connecting to client server
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('websocket client-server connection', (done) => {
    serverSocket.emit('hello', 'world');
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
  });
});