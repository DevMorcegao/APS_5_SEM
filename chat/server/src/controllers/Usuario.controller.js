import Usuario from '../models/Usuario.model';
import bcryptjs from 'bcryptjs';

export class UsuarioController {
  static async getUsuario(ctx) {
    const params = ctx.request.query;

    try {
      const usuario = await Usuario.query()
        .select(
          // Se deixar em branco é como se fosse * (tudo)
          'Id_Usuario',
          'Usuario',
          'Senha',
          'Nome',
        )
        .where((builder) => {
          if (params.Id_Usuario) {
            builder.where('Id_Usuario', params.Id_Usuario);
          }
        });

      ctx.body = usuario;
    } catch (err) {
      console.log(err);
      ctx.body = { msg: err };
    }
  }

  static async postUsuario(ctx, next) {
    const { Senha, ...body } = ctx.request.body;

    try {
      const salt = bcryptjs.genSaltSync(10); // 10 = número de vezes que vai encriptar, quanto maior + seguro e + demorado
      const pwd = bcryptjs.hashSync(Senha, salt); // Mistura a senha com o salt para gerar a senha criptografada

      const novoBody = { ...body, Senha: pwd };

      const usuario = await Usuario.query().insert(novoBody);

      ctx.body = usuario;
    } catch (err) {
      console.log(err);
      ctx.status = 500;
      ctx.body = { msg: err };
    }
  }
}
