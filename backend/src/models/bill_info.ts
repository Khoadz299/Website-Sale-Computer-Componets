import { Model, DataTypes } from 'sequelize';
import configDB from '../../database/config';

const sequelize = configDB;

export default class BillInfo extends Model {
  public id!: number;
  public account_id!: number;
  public phone_number!: string;
  public email!: string;
  public address!: string;
  public invoice_date!: Date;
  public total_money!: number;
  public status!: string;
  public note!: string;
}

BillInfo.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  account_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Account',
          key: 'id'
      }
  },
  phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false
  },
  email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
          isEmail: true
      }
  },
  address: {
      type: DataTypes.STRING(255),
      allowNull: false
  },
  invoice_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
  },
  total_money: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          min: 0
      }
  },
  status: {
      type: DataTypes.ENUM('Chờ', 'Chấp nhận', 'Từ chối', 'Thành công', 'Hủy đơn', 'Hoàn trả'),
      defaultValue: 'Chờ'
  },
  note: {
      type: DataTypes.STRING(255)
  }
}, {
  sequelize,
  tableName: 'bill_info',
  timestamps: false
});

