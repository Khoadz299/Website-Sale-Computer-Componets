import express ,{ Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from '../src/middleware/limitRate';
import bodyParser from 'body-parser';

import Account_Route from './router/account';

import BillInfo_Route from "./router/bill_info";
import BillDetail_Route from "./router/bill_detail";

import List_Image_Product_Route from './router/list_image_product';

import Product_CPU_Route from './router/products/product_cpu';
import Product_VGA_Route from './router/products/product_vga';
import Product_PSU_Route from './router/products/product_psu';
import Product_MONITOR_Route from './router/products/product_monitor';
import Product_RAM_Route from './router/products/product_ram';
import Product_STORAGE_Route from './router/products//product_storage';

// Load data variable from file .evn
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Enables CORS for all requests.
app.use(cors());

// Apply the rate limiting middleware to all requests
app.use(rateLimiter);

// Middleware để phân tích dữ liệu body của request
app.use(bodyParser.json());

// Sử dụng router cho các route
app.use('/account', Account_Route);
app.use('/bill-info', BillInfo_Route);

// List Image Router
app.use('/list-image-product',  List_Image_Product_Route);


// Product Router
app.use('/product-cpu',         Product_CPU_Route);
app.use('/product-vga',         Product_VGA_Route);
app.use('/product-psu',         Product_PSU_Route);
app.use('/product-monitor',     Product_MONITOR_Route);
app.use('/product-ram',         Product_RAM_Route);
app.use('/product-storage',     Product_STORAGE_Route);

app.use('/bill-detail', BillDetail_Route);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}/`)
});