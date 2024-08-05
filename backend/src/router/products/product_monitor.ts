import { Request, Response, Router } from 'express';
import Product_MONITOR from '../../models/products/product_monitor';
import PRODUCTS from '../../models/products';

const Product_MONITOR_Route = Router();

Product_MONITOR_Route.route('/')
.get(async (req: Request, res: Response) => {
  try {
    // http://localhost:3000/monitor?limit=1&offset=1&page=2

    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 12;
    const countProducts : number = await Product_MONITOR.count();
    // số sản phẩm nhỏ hơn offset thì offset = 0 
    const offset : number = countProducts - (limit * page) < 0 ? 0 : countProducts - (limit * page);
    
    const products_MONITOR : Product_MONITOR[] = await Product_MONITOR.findAll({
      // limit: limit,
      // offset: offset
    });

    res.json(products_MONITOR);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error not found list product Monitor' });
  }
})

.post( async (req: Request, res: Response) => {
  try {
    const RequestInfoMONITOR = req.body;
    const countProducts = await Product_MONITOR.count();
    let ID_New : string = `MONITOR-${countProducts + 1 }`

    //    newProductOverall
      await PRODUCTS.create({ product_id : ID_New, product_type : 'MONITOR'});
      const newProductCPU = await Product_MONITOR.create({ id : ID_New, ...RequestInfoMONITOR });

    res.status(201).json(newProductCPU);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product Monitor' });
  }
})


Product_MONITOR_Route
    .route('/:id')
    .get( async (req: Request, res: Response) => {
    const monitor_id: string = req.params.id;
    try {
        const MONITOR = await Product_MONITOR.findByPk(monitor_id);

        if (!MONITOR) {
            return res.status(404).json({ message: `Product Monitor not found with id: ${monitor_id}` });
        }

        res.json(MONITOR);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Not found product Monitor with id: ${monitor_id}` });
        }
    })

  .put( async (req: Request, res: Response) => {
    try {
      const monitor_id: string = req.params.id;
      const RequestInfoMONITOR = req.body;
      const MONITOR = await Product_MONITOR.findByPk(monitor_id);

      if (!MONITOR) {
        return res.status(404).json({ message: 'Product MONITOR not found' });
      }

      MONITOR.name = RequestInfoMONITOR.name                   || MONITOR.name ;
      MONITOR.brand = RequestInfoMONITOR.brand                 || MONITOR.brand ;
      MONITOR.resolution = RequestInfoMONITOR.resolution       || MONITOR.resolution ;
      MONITOR.screen_size = RequestInfoMONITOR.screen_size     || MONITOR.screen_size ;
      MONITOR.panel_type = RequestInfoMONITOR.panel_type       || MONITOR.panel_type ;
      MONITOR.refresh_rate = RequestInfoMONITOR.refresh_rate   || MONITOR.refresh_rate ;
      MONITOR.quantity = RequestInfoMONITOR.quantity           || MONITOR.quantity ;
      MONITOR.price = RequestInfoMONITOR.price                 || MONITOR.price ;

      await MONITOR.save();
      res.json(MONITOR);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating info product monitor' });
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
