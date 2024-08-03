import { Request, Response, Router } from 'express';
import Product_STORAGE from '../../models/products/product_storage';
import PRODUCTS from '../../models/products';

const Product_STORAGE_Route = Router();

Product_STORAGE_Route.route('/')
.get(async (req: Request, res: Response) => {
  try {
    // http://localhost:3000/product-monitor?limit=12&page=2

    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 12;
    const countProducts : number = await Product_STORAGE.count();
    // số sản phẩm nhỏ hơn offset thì offset = 0 
    const offset : number = countProducts - (limit * page) < 0 ? 0 : countProducts - (limit * page);
    
    const products_STORAGE : Product_STORAGE[] = await Product_STORAGE.findAll({
      limit: limit,
      offset: offset
    });

    res.json(products_STORAGE);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error not found list product STORAGE !' });
  }
})

.post( async (req: Request, res: Response) => {
  try {
    const RequestInfoSTORAGE = req.body;
    const countProducts = await Product_STORAGE.count();
    let ID_New : string = `STORAGE-${countProducts + 1 }`
   
    //    newProductOverall
    await PRODUCTS.create({ product_id : ID_New, product_type : 'STORAGE'}); 
    const newProductSTORAGE = await Product_STORAGE.create({ id : ID_New,  ...RequestInfoSTORAGE});
    
    res.status(201).json(newProductSTORAGE);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating new product STORAGE' });
  }
})

Product_STORAGE_Route
    .route('/:id')
    .get( async (req: Request, res: Response) => {
    const storage_id: string = req.params.id;  
    try {
        const STORAGE = await Product_STORAGE.findByPk(storage_id);

        if (!STORAGE) {
            return res.status(404).json({ message: `Product STORAGE not found with id: ${storage_id}` });
        }

        res.json(STORAGE);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Not found product STORAGE with id: ${storage_id}` });
        }
    })


.put( async (req: Request, res: Response) => {
  try {
    const storage_id: string = req.params.id;
    const RequestInfoSTORAGE = req.body;
    const STORAGE = await Product_STORAGE.findByPk(storage_id);
    if (!STORAGE) {
      return res.status(404).json({ message: `Product STORAGE not found with id: ${storage_id}` });
    }

    STORAGE.name = RequestInfoSTORAGE.name           || STORAGE.name;
    STORAGE.brand = RequestInfoSTORAGE.brand         || STORAGE.brand;
    STORAGE.type = RequestInfoSTORAGE.type           || STORAGE.type;
    STORAGE.capacity = RequestInfoSTORAGE.capacity   || STORAGE.capacity;
    STORAGE.quantity = RequestInfoSTORAGE.quantity   || STORAGE.quantity;
    STORAGE.price = RequestInfoSTORAGE.price         || STORAGE.price;

    await STORAGE.save();
    res.json(STORAGE);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating STORAGE' });
  }
})

// STILL NOT USE
.delete( async (req: Request, res: Response) => {
  try {
    const STORAGE = await Product_STORAGE.findByPk(req.params.id);

    if (!STORAGE) {
      return res.status(404).json({ message: 'STORAGE not found' });
    }

    await STORAGE.destroy();
    res.json({ message: 'STORAGE deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting STORAGE' });
  }
});

export default Product_STORAGE_Route;
