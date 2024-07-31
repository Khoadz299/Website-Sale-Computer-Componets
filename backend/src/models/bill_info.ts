import { Model, DataTypes } from 'sequelize';
import configDB from '../../database/config';
const sequelize = configDB;

export default class BillInfo extends Model {
  declare id: number;
  declare account_id: number;
  declare phone_number: string;
  declare email: string;
  declare address: string;
  declare invoice_date: Date;
  declare total_money: number;
  declare status: string;
  declare note: string | null;
}

BillInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone_number: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    invoice_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total_money: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    status: {
      type: new DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Chờ',
      validate: {
        isIn: [['Chờ', 'Chấp nhận', 'Từ chối', 'Thành công', 'Hủy đơn', 'Hoàn trả']],
      },
    },
    note: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'bill_info',
    sequelize, // passing the `sequelize` instance is required
    timestamps: false,
  }
);

