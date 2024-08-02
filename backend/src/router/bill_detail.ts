import { Request, Response, Router } from 'express';
import BillDetail from '../models/bill_detail';

const BillDetail_Route = Router();

BillDetail_Route
  .route('/')
  .post(async (req: Request, res: Response) => {
    try {
      let ID_Max : number = await BillDetail.max('id')
      const ListInfoProductInBill : BillDetail[] = req.body;

      ListInfoProductInBill.map(async product =>{
         ID_Max = ID_Max + 1;
         await BillDetail.create({ ID_Max , ...product });
      })
      res.status(201).json(ListInfoProductInBill);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating new Bill Detail' });
    }
  });

  BillDetail_Route.route('/:id')
  .get(async (req: Request, res: Response) => {
    const IDRequestBillInfo: string = req.params.id;
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
  .put(async (req: Request, res: Response) => {
    try {
      const { bill_info_id , product_id , product_type , quantity , price } = req.body;
      const billDetail = await BillDetail.findByPk(req.params.id);

      if (!billDetail) {
        return res.status(404).json({ message: 'Bill detail not found' });
      }

      billDetail.bill_info_id = bill_info_id     || billDetail.bill_info_id;
      billDetail.product_id = product_id         || billDetail.product_id;
      billDetail.quantity = quantity             || billDetail.quantity;
      billDetail.price = price                   || billDetail.price;

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
