import { Request, Response, Router } from 'express';
import Product_STORAGE from '../../models/products/product_storage';

const Product_STORAGE_Route = Router();

Product_STORAGE_Route.route('/')
.get(async (req: Request, res: Response) => {
  try {
    // http://localhost:3000/product-monitor?limit=12&page=2

    const page   : number = parseInt(req.query.page as string) || 1;
    const limit  : number  = parseInt(req.query.limit as string) || 12;
    const offset : number  = (page - 1) * limit;
    
    const products_STORAGE : Product_STORAGE[] = await Product_STORAGE.findAll({
      limit: limit,
      offset: offset,
      order : [
        ['id' , 'ASC']
     ]
    });

    res.json(products_STORAGE);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error not found list product STORAGE !' });
  }
})

.post( async (req: Request, res: Response) => {
  try {
    let ID_Max : number = await Product_STORAGE.max('id') ;
    let ID_New = ID_Max + 1;
    const { name , brand , type , capacity , quantity , price } = req.body;
    const newProductSTORAGE = await Product_STORAGE.create({ ID_New, name , brand , type , capacity , quantity , price });

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
        const STORAGE = await Product_STORAGE.findByPk(req.params.id);

        if (!STORAGE) {
            return res.status(404).json({ message: `Product STORAGE not found with id: ${storage_id}` });
        }

        res.json(STORAGE);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Not found product STORAGE with id: ${storage_id}` });
        }
    })

// Cập nhật thông tin một tài khoản theo ID
.put( async (req: Request, res: Response) => {
  try {
    const storage_id: string = req.params.id;
    const { name , brand , type , capacity , quantity , price } = req.body;
    const STORAGE = await Product_STORAGE.findByPk(Number(storage_id));

    if (!STORAGE) {
      return res.status(404).json({ message: `Product STORAGE not found with id: ${storage_id}` });
    }

    STORAGE.name = name           || STORAGE.name;
    STORAGE.brand = brand         || STORAGE.brand;
    STORAGE.type = type           || STORAGE.type;
    STORAGE.capacity = capacity   || STORAGE.capacity;
    STORAGE.quantity = quantity   || STORAGE.quantity;
    STORAGE.price = price         || STORAGE.price;

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
