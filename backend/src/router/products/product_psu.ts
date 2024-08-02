import { Request, Response, Router } from 'express';
import Product_PSU from '../../models/products/product_psu';

const Product_PSU_Route = Router();

Product_PSU_Route.route('/')
  .get(async (req: Request, res: Response) => {
    try {
      // http://localhost:6060/product-psu?limit=12&offset=1&page=2
      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string) || 12;
      const offset: number = (page - 1) * limit;

      const products_PSU: Product_PSU[] = await Product_PSU.findAll({
        limit: limit,
        offset: offset,
        order : [
          ['id' , 'ASC']
       ]
      });

      res.json(products_PSU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error not found list product PSU' });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      let ID_Max : number = await Product_PSU.max('id') ;
      let ID_New = ID_Max + 1;
      const { name, standard, power, quantity, price } = req.body;
      const newProductPSU = await Product_PSU.create({ ID_New, name, standard, power, quantity, price });

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
      const { name, standard, power, quantity, price }  = req.body;
      const PSU = await Product_PSU.findByPk(req.params.id);

      if (!PSU) {
        return res.status(404).json({ message: 'Product PSU not found' });
      }

      PSU.name = name          ||   PSU.name;
      PSU.brand = standard     ||   PSU.brand;
      PSU.power = power        ||   PSU.power;
      PSU.quantity = quantity  ||   PSU.quantity;
      PSU.price = price        ||   PSU.price;

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
