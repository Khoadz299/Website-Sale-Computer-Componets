import { Model, DataTypes } from 'sequelize';
import configDB from '../../database/config';
const sequelize = configDB;

export default class List_Image_VGA extends Model {
  declare product_id: number;
  declare url: string;
  declare orderproduct: number;
}

List_Image_VGA.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    orderproduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min :0
      }
    },
  },
  {
    tableName: 'list_image_vga',
    sequelize, // passing the `sequelize` instance is required
    timestamps: false,
  }
);
