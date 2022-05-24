// Back-end responsável pelo chat

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_HOST = 'localhost';
const SERVER_PORT = 8080;

io.on('connection', (socket) => {
  console.log('|IO| Conectado - O servidor tem uma nova conexão');
  socket.on('chat.message', (data) => {
    console.log('|SOCKET| Chat.message => ', data);
    io.emit('chat.message', data);
  });
  socket.on('disconnect', () => {
    console.log(
      '|SOCKET| Disconectado - A conexão com o servidor foi finalizada',
    );
  });
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(
    `|HTTP| Rodando - Servidor rodando na url http://${SERVER_HOST}:${SERVER_PORT}`,
  );
  console.log(
    '|HTTP| Rodando - Pressione CTRL+C para parar de rodar o servidor',
  );
});
