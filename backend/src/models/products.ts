import { Model, DataTypes } from 'sequelize';
import configDB  from '../../database/config' 
const sequelize = configDB

export default class PRODUCTS extends Model {
  declare product_id: string;
  declare product_type: string;
  declare status: string;

}

PRODUCTS.init(
  {
    product_id: {
      type: DataTypes.STRING(50),
      autoIncrement: true,
      primaryKey: true,
    },
    product_type: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
        type: new DataTypes.STRING(50),
        allowNull: false,
        defaultValue : 'Hiển thị',
        validate: {
            isIn: [['Hiển thị', 'Hết hàng' , 'Liên hệ']],
        },
    },
  },
  {
    tableName: 'products',
    sequelize, // passing the `sequelize` instance is required
    timestamps : false
  },
);
