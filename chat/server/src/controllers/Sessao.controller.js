import Sessao from '../models/Sessao.model';
import { default as User } from '../models/Usuario.model';
import bcryptjs from 'bcryptjs';

export class SessaoController {
  static async getSessao(ctx) {
    const sessao = await Sessao.query().select(
      // Se deixar em branco é como se fosse * (tudo)
      'Id_Sessao',
      'Usuario',
      'Token',
      'Data_Hora',
      'Ultima_Acao',
      'Valido',
    );

    ctx.body = sessao;
  }

  static async autenticar(ctx) {
    const { Usuario, Senha } = ctx.request.body;

    const usuario = await User.query().findOne({ Usuario: Usuario }); // findOne -> Procura por qualquer campo

    if (usuario) {
      const sucesso = bcryptjs.compareSync(Senha, usuario.Senha);

      if (sucesso) {
        const salt = bcryptjs.genSaltSync(10);
        const token = bcryptjs.hashSync(Usuario + Senha, salt);

        const sessao = await Sessao.query().insert({
          Usuario: Usuario,
          Token: token,
        });

        ctx.body = sessao;
      } else {
        ctx.body = { erro: 'Senha Inválida' };
        ctx.status = 401;
      }
    } else {
      ctx.body = { erro: 'Usuário não encontrado' };
      ctx.status = 401;
    }
  }

  static async validarSessao(ctx, next) {
    const { Usuario, Senha } = ctx.request.body;

    const usuario = await User.query().findOne({ Usuario: Usuario }); // findOne -> Procura por qualquer campo

    if (usuario) {
      const sucesso = bcryptjs.compareSync(Senha, usuario.Senha);

      if (sucesso) {
        const salt = bcryptjs.genSaltSync(10);
        const token = bcryptjs.hashSync(Usuario + Senha, salt);

        if (!token) {
          alert('Token inválido');
        }
      }
    } else {
    }
  }
}
