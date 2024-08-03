import { Request, Response, Router } from 'express';
import Product_PSU from '../../models/products/product_psu';
import PRODUCTS from '../../models/products';

const Product_PSU_Route = Router();

Product_PSU_Route.route('/')
  .get(async (req: Request, res: Response) => {
    try {
      // http://localhost:6060/product-psu?limit=12&page=2

      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string) || 12;
      const countProducts : number = await Product_PSU.count();
      // số sản phẩm nhỏ hơn offset thì offset = 0 
      const offset : number = countProducts - (limit * page) < 0 ? 0 : countProducts - (limit * page);
      
      const products_PSU: Product_PSU[] = await Product_PSU.findAll({
        limit: limit,
        offset: offset
      });

      res.json(products_PSU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error not found list product PSU' });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const RequestInfoPSU = req.body;
      const countProducts = await Product_PSU.count();
      let ID_New : string = `PSU-${countProducts + 1 }`

      //    newProductOverall
      await PRODUCTS.create({ product_id : ID_New, product_type : 'PSU'});
      const newProductPSU = await Product_PSU.create({ id : ID_New, ...RequestInfoPSU });

      res.status(201).json(newProductPSU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating new product PSU' });
    }
  });

Product_PSU_Route.route('/:id')
  .get(async (req: Request, res: Response) => {
    const psu_id: string = req.params.id;
    try {
      const PSU = await Product_PSU.findByPk(psu_id);

      if (!PSU) {
        return res.status(404).json({ message: `Product PSU not found with id: ${psu_id}` });
      }

      res.json(PSU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Not found product PSU with id: ${psu_id}` });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const RequestInfoPSU  = req.body;
      const PSU = await Product_PSU.findByPk(req.params.id);

      if (!PSU) {
        return res.status(404).json({ message: 'Product PSU not found' });
      }

      PSU.name = RequestInfoPSU.name          ||   PSU.name;
      PSU.brand = RequestInfoPSU.brand        ||   PSU.brand;
      PSU.standard = RequestInfoPSU.standard  ||   PSU.standard;
      PSU.power = RequestInfoPSU.power        ||   PSU.power;
      PSU.quantity = RequestInfoPSU.quantity  ||   PSU.quantity;
      PSU.price = RequestInfoPSU.price        ||   PSU.price;

      await PSU.save();
      res.json(PSU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating product PSU' });
    }
  })
  // STILL NOT USE
  .delete(async (req: Request, res: Response) => {
    try {
      const PSU = await Product_PSU.findByPk(req.params.id);

      if (!PSU) {
        return res.status(404).json({ message: 'Product PSU not found' });
      }

      await PSU.destroy();
      res.json({ message: 'Product PSU deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting product PSU' });
    }
  });

export default Product_PSU_Route;
