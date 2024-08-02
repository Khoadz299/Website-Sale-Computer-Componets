import { Request, Response, Router } from 'express';
import Product_VGA from '../../models/products/product_vga';

const Product_VGA_Route = Router();

Product_VGA_Route
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      // http://localhost:6060/product-vga?limit=1&page=2

      const page   : number = parseInt(req.query.page as string) || 1;
      const limit  : number  = parseInt(req.query.limit as string) || 12;
      const offset : number  = (page - 1) * limit;
      
      const products_VGA : Product_VGA[] = await Product_VGA.findAll({
        limit: limit,
        offset: offset,
        order : [
          ['id' , 'ASC']
       ]
      });

      res.json(products_VGA);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving list product VGA !' });
    }
  })

  .post( async (req: Request, res: Response) => {
    try {
      const { name, brand , memory , gpu_chip , memory_type , quantity , price } = req.body;
      let ID_Max : number = await Product_VGA.max('id') ;
      let ID_New = ID_Max + 1;
      const newProductVGA = await Product_VGA.create({ ID_New , name, brand , memory , gpu_chip , memory_type , quantity , price });

      res.status(201).json(newProductVGA);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating new product VGA !' });
    }
  })

Product_VGA_Route
    .route('/:id')
    .get(async (req: Request, res: Response) => {
      const vga_id: string = req.params.id;
      try {
        const VGA = await Product_VGA.findByPk(vga_id);
  
        if (!VGA) {
          return res.status(404).json({ message: `Product VGA not found with id: ${vga_id}` });
        }
  
        res.json(VGA);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Not found product VGA with id: ${vga_id}` });
      }
    })
      
  .put( async (req: Request, res: Response) => {
    try {
      const { name, brand , memory , gpu_chip , memory_type , quantity , price } = req.body;
      const VGA = await Product_VGA.findByPk(req.params.id);
      if (!VGA) {
        return res.status(404).json({ message: 'Product VGA not found' });
      }

      VGA.name = name;
      VGA.brand = brand ;
      VGA.memory = memory ;
      VGA.gpu_chip = gpu_chip ;
      VGA.memory_type = memory_type ;
      VGA.quantity = quantity ;
      VGA.price = price ;
  
      await VGA.save();
      res.json(VGA);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating Product VGA' });
    }
  })

  .delete( async (req: Request, res: Response) => {
    try {
      const VGA = await Product_VGA.findByPk(req.params.id);

      if (!VGA) {
        return res.status(404).json({ message: 'Product VGA not found' });
      }

      await VGA.destroy();
      res.json({ message: 'Product VGA deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting Product VGA' });
    }
  });

export default Product_VGA_Route;
