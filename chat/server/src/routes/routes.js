import Router from 'koa-router';
import { UsuarioController } from '../controllers/Usuario.controller';
import { SessaoController } from '../controllers/Sessao.controller';

// Rotas do back-end

const publicRouter = new Router();
const privateRouter = new Router();

privateRouter.post('/private/usuario', UsuarioController.postUsuario);
publicRouter.post('/public/sessao', SessaoController.autenticar);

export { publicRouter, privateRouter };
