import { knexdb } from '../database/db.config';
import { Model } from 'objection';

Model.knex(knexdb);

class Sessao extends Model {
  static get tableName() {
    return 'SESSAO';
  }

  static get idColumn() {
    return 'Id_Sessao';
  }
}

export default Sessao;
