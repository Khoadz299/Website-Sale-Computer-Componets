import { Request, Response, Router } from 'express';
import List_Image_Product from '../models/list_image_product';
import PRODUCTS from '../models/products'
import { Sequelize , Op } from 'sequelize';
const List_Image_Product_Route = Router();

List_Image_Product_Route
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      const list_image : List_Image_Product[] = await List_Image_Product.findAll({
        attributes: ['product_id','url', 'order_image'], 
        // Chỉ truy vấn các cột trên
        // nó tự động truy xuất cột id mà model này k có 
        order : [
          ['order_image' , 'ASC']  // tăng dần vì order nhỏ nhât làm ảnh đại diện cho product đó
      ]
      });
      res.json(list_image);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Not found list image !' });
    }
  })
  
List_Image_Product_Route
    .route('/id/:id')
    .get(async (req: Request, res: Response) => {
    try {
        let IDRequestProduct : string = req.params.id;
        const list_image : List_Image_Product[] = await List_Image_Product.findAll({
        attributes: ['product_id','url', 'order_image'] ,
        order : [
            ['order_image' , 'ASC'] 
        ],
        where : {
            product_id :  IDRequestProduct
        }
        });
        res.json(list_image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Not found list image by id!' });
    }
    })
List_Image_Product_Route  // lấy ảnh các sản phẩm theo loại và hiển thị 1 ảnh đại diện mỗi sản phẩm
    .route('/type/:product_type')
    .get(async (req: Request, res: Response) => {
    try {

        let IDRequestProductType : string = req.params.product_type;
        const listIDProduct : PRODUCTS[] = await PRODUCTS.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('product_id')), 'product_id'],
            ],
            where: {
                product_type: IDRequestProductType,
            },   
        });
        const arrIDProduct= listIDProduct.map((product) => product.product_id);
        
        const list_image : List_Image_Product[] = await List_Image_Product.findAll({
        attributes: ['product_id','url', 'order_image'] ,
        order : [
            ['order_image' , 'ASC'] 
        ],
        where : {
            product_id: {
                [Op.in]: arrIDProduct
            },
            order_image : 0
        }
        });
        res.json(list_image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Not found list image !' });
    }
    })    
    
export default List_Image_Product_Route;
