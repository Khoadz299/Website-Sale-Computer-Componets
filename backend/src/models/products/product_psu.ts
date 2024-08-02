import { Model, DataTypes } from 'sequelize';
import configDB  from '../../../database/config' 
const sequelize = configDB

export default class Product_PSU extends Model {
  declare id: string;
  declare name: string;
  declare brand: string;
  declare standard: string;
  declare power: string;
  declare quantity: number;
  declare price: number;
}

Product_PSU.init(
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
    standard: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    power: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    quantity: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 0,
    },
    price: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 100000000
    },
  },
  {
    tableName: 'product_psu',
    sequelize, // passing the `sequelize` instance is required
    timestamps : false
  },
);
