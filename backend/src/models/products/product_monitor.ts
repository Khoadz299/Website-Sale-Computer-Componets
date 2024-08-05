import { Model, DataTypes } from 'sequelize';
import configDB  from '../../../database/config' 
const sequelize = configDB

export default class Product_MONITOR extends Model {
  declare id: string;
  declare name: string;
  declare brand: string;
  declare resolution : string;
  declare screen_size: string;
  declare panel_type: string;
  declare refresh_rate: string;
  declare response_time: string;
  declare quantity: number;
  declare price: number;
}
Product_MONITOR.init(
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
    resolution: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    screen_size: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    panel_type: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    refresh_rate: {
      type: new DataTypes.STRING(50),
      allowNull: false,
  },
    response_time: {
      type: new DataTypes.STRING(50),
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
    tableName: 'product_monitor',
    sequelize, // passing the `sequelize` instance is required
    timestamps : false
  },
);