// Back-end responsável pelo Login

import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { publicRouter, privateRouter } from './routes/routes';

const app = new Koa();

app.use(cors());
app.use(bodyParser());

const httpPort = 3333;

app.use(async (ctx, next) => {
  try {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
  }
});

app.on('error', (err, ctx) => {
  console.log(err);
  console.log('Ocorreu um erro');
});

app.use(privateRouter.routes()); // Basicamente tá falando pra pegar todas as rotas que estão dentro do Router e usa-lás.
app.use(publicRouter.routes());

app.listen(httpPort);
console.log('Servidor rodando na porta ' + httpPort);
