import { Sequelize } from 'sequelize';

let database : string = 'ShopSaleComponentsComputer'
let username : string = 'postgres'
let password : string = 'Khoadz26'

const config = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port : 5432 ,
  });

export default config;
