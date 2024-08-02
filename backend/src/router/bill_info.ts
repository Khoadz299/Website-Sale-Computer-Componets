import { Request, Response, Router } from 'express';
import BillInfo from '../models/bill_info';

const BillInfo_Route = Router();

BillInfo_Route.route('/')
  .get(async (req: Request, res: Response) => {
    try {
      // http://localhost:6060/product-cpu?limit=12&offset=1&page=2
      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string) || 12;
      const offset: number = (page - 1) * limit;

      const list_BillInfo: BillInfo[] = await BillInfo.findAll({
        limit: limit,
        offset: offset,
        order : [
          ['id' , 'DESC']
       ]
      });

      res.json(list_BillInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error not found list Bill Info' });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const RequestInfoBill = req.body;
      const newBillInfo = await BillInfo.create({ ...RequestInfoBill });

      res.status(201).json(newBillInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating new Bill Info' });
    }
  });

BillInfo_Route.route('/:id')
  .get(async (req: Request, res: Response) => {
    const billInfo_id: string = req.params.id;
    try {
      const billInfo = await BillInfo.findByPk(billInfo_id);

      if (!billInfo) {
        return res.status(404).json({ message: `Bill Info not found with id: ${billInfo_id}` });
      }

      res.json(billInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Not found bill info with id: ${billInfo_id}` });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const { account_id , phone_number , email , address , invoice_date , total_money , status , note } = req.body;
      const billInfo = await BillInfo.findByPk(req.params.id);

      if (!billInfo) {
        return res.status(404).json({ message: 'Bill Info not found' });
      }

      billInfo.account_id = account_id             || billInfo.account_id;
      billInfo.phone_number = phone_number         || billInfo.phone_number;
      billInfo.email = email                       || billInfo.email;
      billInfo.address = address                   || billInfo.address;
      billInfo.invoice_date = invoice_date         || billInfo.invoice_date;
      billInfo.total_money = total_money           || billInfo.total_money;
      billInfo.status = status                     || billInfo.status;
      billInfo.note = note                         || billInfo.note;

      await billInfo.save();
      res.json(billInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating bill info' });
    }
  })
  // STILL NOT USE
  .delete(async (req: Request, res: Response) => {
    try {
      const billInfo = await BillInfo.findByPk(req.params.id);

      if (!billInfo) {
        return res.status(404).json({ message: 'Bill info not found' });
      }

      await billInfo.destroy();
      res.json({ message: 'Bill Info deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting bill info' });
    }
  });

export default BillInfo_Route;
