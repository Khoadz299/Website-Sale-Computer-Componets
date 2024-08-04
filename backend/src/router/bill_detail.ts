import { Request, Response, Router } from 'express';
import BillDetail from '../models/bill_detail';


const BillDetail_Route = Router();

BillDetail_Route
  .route('/')
  .post(async (req: Request, res: Response) => {
    try {
      let ID_Max : number = await BillDetail.max('id')
      const ListInfoProductInBill : BillDetail[] = req.body;
      console.log(ListInfoProductInBill);
      ListInfoProductInBill.map(async product =>{
        
        ID_Max = ID_Max + 1;
        console.log({ ID_Max , ...product });
        // do cái product nó có id đã khai báo thì không truyền vào theo ({ id : ID_New, ...product });
        // sẽ bị lỗi , do cái id : ID new khai báo nhiều hơn 1 lần
        product.id = ID_Max;
        const newBillDetail = await BillDetail.create({ ...product });

         console.log(newBillDetail);
      })
      res.status(201).json(ListInfoProductInBill);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating new Bill Detail' });
    }
  })
  .get(async (req: Request, res: Response) => {
    try {
      const ListProductInBillDetail = await BillDetail.findAll({
      });

      if (!ListProductInBillDetail) {
        return res.status(404).json({ message: `Bill Detail not found with ` });
      }

      res.json(ListProductInBillDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Not found bill detail with id` });
    }
  })
  BillDetail_Route.route('/:id_bill')
  .get(async (req: Request, res: Response) => {
    const IDRequestBillInfo: string = req.params.id_bill;
    try {
      const ListProductInBillDetail = await BillDetail.findAll({
        where : {
          bill_info_id :  IDRequestBillInfo
        }
      });

      if (!ListProductInBillDetail) {
        return res.status(404).json({ message: `Bill Detail not found with id: ${IDRequestBillInfo}` });
      }

      res.json(ListProductInBillDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Not found bill detail with id: ${IDRequestBillInfo}` });
    }
  })
  // NOT USE
  .put(async (req: Request, res: Response) => {
    try {
      const RequestInfoBillDetail = req.body;
      const billDetail = await BillDetail.findByPk(req.params.id);

      if (!billDetail) {
        return res.status(404).json({ message: 'Bill detail not found' });
      }

      billDetail.bill_info_id = RequestInfoBillDetail.bill_info_id     || billDetail.bill_info_id;
      billDetail.product_id = RequestInfoBillDetail.product_id         || billDetail.product_id;
      billDetail.quantity = RequestInfoBillDetail.quantity             || billDetail.quantity;
      billDetail.price = RequestInfoBillDetail.price                   || billDetail.price;

      await billDetail.save();
      res.json(billDetail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating bill detail' });
    }
  })
  // STILL NOT USE
  .delete(async (req: Request, res: Response) => {
    try {
      const billDetail = await BillDetail.findByPk(req.params.id);

      if (!billDetail) {
        return res.status(404).json({ message: 'Bill detail not found' });
      }

      await billDetail.destroy();
      res.json({ message: 'Bill detail deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting bill detail' });
    }
  });

export default BillDetail_Route;
