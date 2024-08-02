import { Model, DataTypes } from 'sequelize';
import configDB from '../../database/config';
const sequelize = configDB;

export default class BillDetail extends Model {
  declare id: number;
  declare bill_info_id: number;
  declare product_id: string;
  declare quantity: number;
  declare price: number;
}

BillDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bill_info_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: 'bill_detail',
    sequelize, // passing the `sequelize` instance is required
    timestamps: false,
  }
);
