import { Model, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Team extends Model {
  // public <campo>!: <tipo>;
  teamName: string;
}

Team.init({
  // ... Campos
  teamName: STRING,

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

export default Team;
