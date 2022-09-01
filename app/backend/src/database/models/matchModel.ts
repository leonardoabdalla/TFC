import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Match extends Model {
  // public <campo>!: <tipo>;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init({
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

export default Match;
