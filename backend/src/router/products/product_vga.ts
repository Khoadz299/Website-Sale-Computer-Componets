import { Request, Response, Router } from 'express';
import Product_VGA from '../../models/products/product_vga';
import PRODUCTS from '../../models/products';

const Product_VGA_Route = Router();

Product_VGA_Route
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      // http://localhost:6060/product-vga?limit=1&page=2

      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string) || 12;
      const countProducts : number = await Product_VGA.count();
      // số sản phẩm nhỏ hơn offset thì offset = 0 
      const offset : number = countProducts - (limit * page) < 0 ? 0 : countProducts - (limit * page);
    
      const products_VGA : Product_VGA[] = await Product_VGA.findAll({
        // limit: limit,
        // offset: offset,
      });

      res.json(products_VGA);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving list product VGA !' });
    }
  })

  .post( async (req: Request, res: Response) => {
    try {
      const RequestInfoVGA = req.body;
      const countProducts = await Product_VGA.count();
      let ID_New : string = `VGA-${countProducts + 1 }`

      //    newProductOverall
      await PRODUCTS.create({ product_id : ID_New, product_type : 'VGA'}); 
      const newProductVGA = await Product_VGA.create({ id : ID_New,  ...RequestInfoVGA});

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
      const vga_id = req.params.id;
      const RequestInfoVGA = req.body;
      const VGA = await Product_VGA.findByPk(vga_id);

      if (!VGA) {
        return res.status(404).json({ message: 'Product VGA not found' });
      }

      VGA.name = RequestInfoVGA.name                   || VGA.name;
      VGA.brand = RequestInfoVGA.brand                 || VGA.brand;
      VGA.memory = RequestInfoVGA.memory               || VGA.memory;
      VGA.gpu_chip = RequestInfoVGA.gpu_chip           || VGA.gpu_chip;
      VGA.memory_type = RequestInfoVGA.memory_type     || VGA.memory_type; ;
      VGA.quantity = RequestInfoVGA.quantity           || VGA.quantity; ;
      VGA.price = RequestInfoVGA.price                 || VGA.price; ;
  
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
