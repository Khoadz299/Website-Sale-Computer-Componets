import { Request, Response, Router } from 'express';
import Product_CPU from '../../models/products/product_cpu';
import PRODUCTS from '../../models/products';

const Product_CPU_Route = Router();

Product_CPU_Route.route('/')
  .get(async (req: Request, res: Response) => {
    try {
      // http://localhost:6060/product-cpu?limit=12&page=2
      
      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string) || 12;
      const countProducts : number = await Product_CPU.count();
      // số sản phẩm nhỏ hơn offset thì offset = 0 
      const offset : number = countProducts - (limit * page) < 0 ? 0 : countProducts - (limit * page);
      
      const products_CPU: Product_CPU[] = await Product_CPU.findAll({
        limit: limit,
        offset: offset,
      });

      res.json(products_CPU);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error not found list product CPU' });
    }
  })
  // Thêm sản phẩm mới
  .post(async (req: Request, res: Response) => {
    try {
      const RequestInfoCPU = req.body;
      const countProducts = await Product_CPU.count();
      let ID_New : string = `CPU-${countProducts + 1 }`
     
      //    newProductOverall
      await PRODUCTS.create({ product_id : ID_New, product_type : 'CPU'});
      const newProductCPU = await Product_CPU.create({ id : ID_New, ...RequestInfoCPU });

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
      const CPU = await Product_CPU.findByPk(cpu_id);
      // const CPU = await Product_CPU.findOne({ where: { id: cpu_id } });
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
      const cpu_id: string = req.params.id;
      const RequestInfoCPU = req.body;
      const CPU = await Product_CPU.findByPk(cpu_id);

      if (!CPU) {
        return res.status(404).json({ message: 'Product CPU not found' });
      }
 
      CPU.name       = RequestInfoCPU.name           || CPU.name;
      CPU.brand      = RequestInfoCPU.brand          || CPU.brand;
      CPU.socket     = RequestInfoCPU.socket         || CPU.socket;
      CPU.model      = RequestInfoCPU.model          || CPU.model;
      CPU.quantity   = RequestInfoCPU.quantity       || CPU.quantity;
      CPU.price      = RequestInfoCPU.price          || CPU.price;
      
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
