import { query, Request, Response, Router } from 'express';
import Cart from '../models/cart';
import PRODUCTS from '../models/products';
import config from '../../database/config';

const configDB =  config ;


const QueryRaw = async(product_id : string , product_type : string)=>{
  let string_query = `SELECT price FROM  Product_${product_type} WHERE id = ${product_id}` 
  await configDB.query(string_query);
}


const CartTest_Route = Router();

  CartTest_Route.route('/:account_id')
  .get(async (req: Request, res: Response) => {
    try {
      const ListProductInCart = await Cart.findAll({
        attributes : ["account_id", "product_id", "quantity" ],
        where : {
          account_id :  req.params.account_id
        }
      });
      
      if (!ListProductInCart) {
        return res.status(404).json({ message: `Bill Detail not found with id: ` });
      }

      res.json(ListProductInCart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Not found bill detail with id:` });
    }
  })

export default CartTest_Route;
