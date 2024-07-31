import { Model, DataTypes } from 'sequelize';
import configDB from '../../database/config';
const sequelize = configDB;

export default class List_Image_STORAGE extends Model {
  declare product_id: number;
  declare url: string;
  declare orderProduct: number;
}

List_Image_STORAGE.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    orderProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min :0
      }
    },
  },
  {
    tableName: 'list_image_storage',
    sequelize, // passing the `sequelize` instance is required
    timestamps: false,
  }
);
