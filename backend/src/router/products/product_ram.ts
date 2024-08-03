import { Request, Response, Router } from 'express';
import Product_RAM from '../../models/products/product_ram';
import PRODUCTS from '../../models/products';

const Product_RAM_Route = Router();

Product_RAM_Route.route('/')
.get(async (req: Request, res: Response) => {
  try {
    // http://localhost:6060/ram?limit=1&offset=1&page=2

    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 12;
    const countProducts : number = await Product_RAM.count();
    // số sản phẩm nhỏ hơn offset thì offset = 0 
    const offset : number = countProducts - (limit * page) < 0 ? 0 : countProducts - (limit * page);
    
    const products_RAM : Product_RAM[] = await Product_RAM.findAll({
      limit: limit,
      offset: offset
    });

    res.json(products_RAM);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error not found list product RAM' });
  }
})

.post( async (req: Request, res: Response) => {
  try {
    const RequestInfoRAM = req.body;
    const countProducts = await Product_RAM.count();
    let ID_New : string = `RAM-${countProducts + 1 }`
   
    //    newProductOverall
    await PRODUCTS.create({ product_id : ID_New, product_type : 'RAM'}); 
    const newProductRAM = await Product_RAM.create({ id : ID_New,  ...RequestInfoRAM});

    res.status(201).json(newProductRAM);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product RAM' });
  }
})


Product_RAM_Route
    .route('/:id')
    .get( async (req: Request, res: Response) => {
    const ram_id: string = req.params.id;
    try {
        const RAM = await Product_RAM.findByPk(ram_id);

        if (!RAM) {
            return res.status(404).json({ message: `Product RAM not found with id: ${ram_id}` });
        }

        res.json(RAM);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Not found product CPU with id: ${ram_id}` });
        }
    })

.put( async (req: Request, res: Response) => {
  try {
    const ram_id: string = req.params.id;
    const RequestInfoRAM = req.body;
    const RAM = await Product_RAM.findByPk(ram_id);

    if (!RAM) {
      return res.status(404).json({ message: 'RAM not found' });
    }

    RAM.name = RequestInfoRAM.name             || RAM.name;
    RAM.brand = RequestInfoRAM.brand           || RAM.brand;
    RAM.capacity = RequestInfoRAM.capacity     || RAM.capacity;
    RAM.bus_speed = RequestInfoRAM.bus_speed   || RAM.bus_speed;
    RAM.model = RequestInfoRAM.model           || RAM.model;
    RAM.quantity = RequestInfoRAM.quantity     || RAM.quantity;
    RAM.price = RequestInfoRAM.price           || RAM.price;

    await RAM.save();
    res.json(RAM);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating account' });
  }
})

// STILL NOT USE
.delete( async (req: Request, res: Response) => {
  try {
    const RAM = await Product_RAM.findByPk(req.params.id);

    if (!RAM) {
      return res.status(404).json({ message: 'RAM not found' });
    }

    await RAM.destroy();
    res.json({ message: 'RAM deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting RAM' });
  }
});

export default Product_RAM_Route;
