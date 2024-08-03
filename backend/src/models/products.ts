import { Model, DataTypes } from 'sequelize';
import configDB  from '../../database/config' 

const sequelize = configDB

export default class PRODUCTS extends Model {
  public product_id!: string;
  public product_type!: string;
  public status!: string;
}

PRODUCTS.init({
  product_id: {
      type: DataTypes.STRING(50),
      primaryKey: true
  },
  product_type: {
      type: DataTypes.ENUM('CPU', 'VGA', 'MONITOR', 'RAM', 'PSU', 'STORAGE'),
      allowNull: false
  },
  status: {
      type: DataTypes.ENUM('Hiển thị', 'Hết hàng', 'Liên hệ'),
      defaultValue: 'Hiển thị'
  }
}, {
  sequelize,
  tableName: 'products',  
  timestamps: false
});
