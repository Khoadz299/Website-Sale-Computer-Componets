import { Model, DataTypes } from 'sequelize';
import configDB  from '../../database/config' 
const sequelize = configDB

export default class Product_VGA extends Model {
  declare id: number;
  declare name: string;
  declare brand: string;
  declare memory: string;
  declare gpu_chip: string;
  declare memory_type: string;
  declare quantity: number;
  declare price: number;
}

Product_VGA.init(
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
    memory: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    gpu_chip: {
        type: new DataTypes.STRING(50),
        allowNull: false,
    },
    memory_type: {
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
    tableName: 'product_vga',
    sequelize, // passing the `sequelize` instance is required
    timestamps : false
  },
);
