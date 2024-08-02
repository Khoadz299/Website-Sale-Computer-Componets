import { Model, DataTypes } from 'sequelize';
import configDB  from '../../database/config' 
const sequelize = configDB

export default class Cart extends Model {
  declare account_id: number;
  declare product_id: string;
  declare quantity: number;
}

Cart.init(
  {
    account_id: {
      type: DataTypes.INTEGER,
      allowNull : false,
    },
    product_id: {
      type: new DataTypes.STRING(50),
      allowNull: false,
    },
    quantity: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        defaultValue : 1,
        validate: {
            min : 1,
        },
    },
  },
  {
    tableName: 'cart',
    sequelize, // passing the `sequelize` instance is required
    timestamps : false
  },
);
