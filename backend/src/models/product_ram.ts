import { Model, DataTypes } from 'sequelize';
import configDB  from '../../database/config' 
const sequelize = configDB

export default class Product_RAM extends Model {
  declare id: number;
  declare name: string;
  declare brand: string;
  declare capacity: string;
  declare bus_speed: string;
  declare model: string;
  declare quantity: number;
  declare price: number;
}

Product_RAM.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    capacity: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    bus_speed: {
        type: new DataTypes.STRING(50),
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
    tableName: 'product_ram',
    sequelize, // passing the `sequelize` instance is required
    timestamps : false
  },
);
