import { Model, DataTypes } from 'sequelize';
import configDB  from '../../database/config' 
const sequelize = configDB

export default class Account extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare role: string;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    role: {
        type: new DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'user',
        validate: {
          isIn: [['admin', 'user']],
        },
    },
  },
  {
    tableName: 'account',
    sequelize, // passing the `sequelize` instance is required
    timestamps : false
  },
);
