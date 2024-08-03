import { Model, DataTypes  } from 'sequelize';
import configDB from '../../database/config';
const sequelize = configDB;

export default class List_Image_Product extends Model {
  public product_id!: string;
  public url!: string;
  public order_image!: number;
}

List_Image_Product.init({
  product_id: {
      type: DataTypes.STRING(50),
      references: {
          model: 'Products',
          key: 'product_id'
      },
      onDelete: 'CASCADE'
  },
  url: {
      type: DataTypes.STRING(255),
      allowNull: false
  },
  order_image: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          min: 0
      }
  }
}, {
  sequelize,
  tableName: 'List_Image_Product',
  timestamps: false,
  indexes: [
      {
          unique: true,
          fields: ['product_id', 'url']
      },
      {
          unique: true,
          fields: ['product_id', 'order_image']
      }
  ]
});
