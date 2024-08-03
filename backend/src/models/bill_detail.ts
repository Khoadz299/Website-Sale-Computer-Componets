import { Model, DataTypes } from 'sequelize';
import configDB from '../../database/config';

const sequelize = configDB;

export default class BillDetail extends Model {
  public id!: number;
  public bill_info_id!: number;
  public product_id!: string;
  public quantity!: number;
  public price!: number;
}

BillDetail.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  bill_info_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Bill_Info',
          key: 'id'
      }
  },
  product_id: {
      type: DataTypes.STRING(50),
      references: {
          model: 'Products',
          key: 'product_id'
      }
  },
  quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          min: 1
      }
  },
  price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          min: 0
      }
  }
}, {
  sequelize,
  tableName: 'Bill_Detail',
  timestamps: false
});
