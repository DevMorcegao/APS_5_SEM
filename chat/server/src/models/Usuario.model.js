import { knexdb } from '../database/db.config';
import { Model } from 'objection';

Model.knex(knexdb);

class Usuario extends Model {
  static get tableName() {
    return 'USUARIO';
  }

  static get idColumn() {
    return 'Id_Usuario';
  }
}

export default Usuario;
