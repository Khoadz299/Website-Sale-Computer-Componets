import { Model, DataTypes } from 'sequelize';
import configDB  from '../../../database/config' 
const sequelize = configDB

export default class Product_CPU extends Model {
  declare id: string;
  declare name: string;
  declare brand: string;
  declare socket: string;
  declare model: string;
  declare quantity: number;
  declare price: number;
}

Product_CPU.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique : true
    },
    brand: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    socket: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    model: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    quantity: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0
    },
    price: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 100000000
    },
  },
  {
    tableName: 'product_cpu',
    sequelize, // passing the `sequelize` instance is required
    timestamps : false
  },
);
