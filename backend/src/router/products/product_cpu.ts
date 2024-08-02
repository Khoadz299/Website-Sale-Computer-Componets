import { Request, Response, Router } from 'express';
import Product_CPU from '../../models/products/product_cpu';

const Product_CPU_Route = Router();

Product_CPU_Route.route('/')
  .get(async (req: Request, res: Response) => {
    try {
      // http://localhost:6060/product-cpu?limit=12&offset=1&page=2
      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string) || 12;
      const offset: number = (page - 1) * limit;

      const products_CPU: Product_CPU[] = await Product_CPU.findAll({
        limit: limit,
        offset: offset,
        order : [
          ['id' , 'ASC']
       ]
      });
      
      res.json(products_CPU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error not found list product CPU' });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      let ID_Max : number = await Product_CPU.max('id') ;
      let ID_New = ID_Max + 1;
      const { name, brand, socket, model, quantity, price } = req.body;
      const newProductCPU = await Product_CPU.create({ ID_New, name, brand, socket, model, quantity, price });

      res.status(201).json(newProductCPU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating new product CPU' });
    }
  });

Product_CPU_Route.route('/:id')
  .get(async (req: Request, res: Response) => {
    const cpu_id: string = req.params.id;
    try {
      //const CPU = await Product_CPU.findByPk(cpu_id);
      const CPU = await Product_CPU.findOne({ where: { id: cpu_id } });
      if (!CPU) {
        return res.status(404).json({ message: `Product CPU not found with id: ${cpu_id}` });
      }

      res.json(CPU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Not found product CPU with id: ${cpu_id}` });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const Product_CPU = req.body;
      const CPU = await Product_CPU.findByPk(req.params.id);

      if (!CPU) {
        return res.status(404).json({ message: 'Product CPU not found' });
      }
 
      CPU.name       = Product_CPU.name           || CPU.name;
      CPU.brand      = Product_CPU.brand          || CPU.brand;
      CPU.socket     = Product_CPU.socket         || CPU.socket;
      CPU.model      = Product_CPU.model          || CPU.model;
      CPU.quantity   = Product_CPU.quantity       || CPU.quantity;
      CPU.price      = Product_CPU.price          || CPU.price;
      //await jane.save({ fields: ['name'] });
      await CPU.save();
      res.json(CPU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating product CPU' });
    }
  })
  // STILL NOT USE
  .delete(async (req: Request, res: Response) => {
    try {
      const CPU = await Product_CPU.findByPk(req.params.id);

      if (!CPU) {
        return res.status(404).json({ message: 'Product CPU not found' });
      }

      await CPU.destroy();
      res.json({ message: 'Product CPU deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting product CPU' });
    }
  });

export default Product_CPU_Route;
