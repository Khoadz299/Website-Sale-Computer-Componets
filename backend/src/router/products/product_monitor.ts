import { Request, Response, Router } from 'express';
import Product_MONITOR from '../../models/products/product_monitor';
import { NUMBER } from 'sequelize';

const Product_MONITOR_Route = Router();

Product_MONITOR_Route.route('/')
.get(async (req: Request, res: Response) => {
  try {
    // http://localhost:3000/monitor?limit=1&offset=1&page=2

    const page   : number = parseInt(req.query.page as string) || 1;
    const limit  : number  = parseInt(req.query.limit as string) || 10;
    const offset : number  = (page - 1) * limit;
    
    const products_MONITOR : Product_MONITOR[] = await Product_MONITOR.findAll({
      limit: limit,
      offset: offset,
      order : [
        ['id' , 'ASC']
     ]
    });

    res.json(products_MONITOR);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error not found list product MONITOR' });
  }
})

.post( async (req: Request, res: Response) => {
  try {
    let ID_Max : number = await Product_MONITOR.max('id') ;
    let ID_New = ID_Max + 1;
    const {  name , brand , resolution , screen_size , panel_type , refresh_rate , quantity , price } = req.body;
    const newProductMONITOR = await Product_MONITOR.create({ ID_New, name , brand , resolution , screen_size , panel_type , refresh_rate , quantity , price });

    res.status(201).json(newProductMONITOR);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating account' });
  }
})


Product_MONITOR_Route
    .route('/:id')
    .get( async (req: Request, res: Response) => {
    const monitor_id: string = req.params.id;
    try {
        const MONITOR = await Product_MONITOR.findByPk(monitor_id);

        if (!MONITOR) {
            return res.status(404).json({ message: `Product MONITOR not found with id: ${monitor_id}` });
        }

        res.json(MONITOR);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Not found product MONITOR with id: ${monitor_id}` });
        }
    })

  .put( async (req: Request, res: Response) => {
    try {
      const monitor_id: string = req.params.id;
      const { name , brand , resolution , screen_size , panel_type , refresh_rate , quantity , price } = req.body;
      const MONITOR = await Product_MONITOR.findByPk(Number(monitor_id));

      if (!MONITOR) {
        return res.status(404).json({ message: 'Product MONITOR not found' });
      }

      MONITOR.name = name                   || MONITOR.name ;
      MONITOR.brand = brand                 || MONITOR.brand ;
      MONITOR.resolution = resolution       || MONITOR.resolution ;
      MONITOR.screen_size = screen_size     || MONITOR.screen_size ;
      MONITOR.panel_type = panel_type       || MONITOR.panel_type ;
      MONITOR.refresh_rate = refresh_rate   || MONITOR.refresh_rate ;
      MONITOR.quantity = quantity           || MONITOR.quantity ;
      MONITOR.price = price                 || MONITOR.price ;

      await MONITOR.save();
      res.json(MONITOR);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating account' });
    }
  })

  // STILL NOT USE
  .delete( async (req: Request, res: Response) => {
    try {
      const MONITOR = await Product_MONITOR.findByPk(req.params.id);

      if (!MONITOR) {
        return res.status(404).json({ message: 'Product MONITOR not found' });
      }

      await MONITOR.destroy();
      res.json({ message: 'Product MONITOR deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting product MONITOR' });
    }
  });

export default Product_MONITOR_Route;
