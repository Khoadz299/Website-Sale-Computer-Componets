import { Model, DataTypes } from 'sequelize';
import configDB from '../../database/config';
const sequelize = configDB;

export default class List_Image_Product extends Model {
  declare product_id: number;
  declare product_type : string;
  declare url: string;
  declare order_image: number;
}

List_Image_Product.init(
  {
    product_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    url: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    order_image: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min :0
      }
    },
  },
  {
    tableName: 'list_image_product',
    sequelize, // passing the `sequelize` instance is required
    timestamps: false,
    indexes: [
      {
          unique: true,
          fields: ['product_id', 'url']
      }
  ]
  }
);
