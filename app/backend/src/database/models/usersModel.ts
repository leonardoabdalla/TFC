import { Model, INTEGER } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Users extends Model {
  // public <campo>!: <tipo>;
  public id: number;
  public email: string;
  public password: string;
  public username: string;
  public role: string;
}

Users.init({
  // ... Campos
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    allowNull: false,
    type: INTEGER,
  },
  role: {
    type: INTEGER,
    allowNull: false,
  },
  email: {
    type: INTEGER,
    allowNull: false,
    unique: true,
  },
  password: {
    type: INTEGER,
    allowNull: false,
  },

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Users;
