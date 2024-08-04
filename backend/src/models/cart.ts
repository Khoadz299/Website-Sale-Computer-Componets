import { Model, DataTypes } from 'sequelize';
import configDB from '../../database/config';
import Account from './account';


const sequelize = configDB;

export default class Cart extends Model {
  public account_id!: number;
  public product_id!: string;
  public quantity!: number;
}

Cart.init({
  account_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Account',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  product_id: {
    type: DataTypes.STRING(50),
    references: {
      model: 'Products',
      key: 'product_id'
    },
    onDelete: 'CASCADE'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
}, {
  sequelize,
  tableName: 'cart',
  timestamps: false
});

