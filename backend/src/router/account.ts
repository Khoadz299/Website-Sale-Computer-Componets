import { Request, Response, Router } from 'express';
import Account from '../models/account';

const Account_Route = Router();

Account_Route.route('/')
.get(async (req: Request, res: Response) => {
  try {
    // http://localhost:3000/accounts?limit=1&offset=1&page=2

    const page   : number = parseInt(req.query.page as string) || 1;
    const limit  : number  = parseInt(req.query.limit as string) || 10;
    const offset : number  = (page - 1) * limit;
    
    const accounts : Account[] = await Account.findAll({
      limit: limit,
      offset: offset,
      order : [
        ['id' , 'DESC']
     ]
    });

    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving accounts' });
  }
})
Account_Route.route('/register')
  .post( async (req: Request, res: Response) => {
    try {
      const { id, username, password, role } = req.body;
      const newAccount = await Account.create({ id,  username, password, role });

      res.status(201).json(newAccount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating account' });
    }
  })

Account_Route.route('/login')
  .post( async (req: Request, res: Response) => {
    try {
      const { id, username, password, role } = req.body;
      const newAccount = await Account.create({ id,  username, password, role });

      res.status(201).json(newAccount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating account' });
    }
  })

// Lấy thông tin một tài khoản theo ID
Account_Route
    .route('/:id')
    .get( async (req: Request, res: Response) => {
    try {
        const account = await Account.findByPk(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.json(account);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving account' });
        }
    })

  // Cập nhật thông tin một tài khoản theo ID
  .put( async (req: Request, res: Response) => {
    try {
      const { password, role } = req.body;
      const account = await Account.findByPk(req.params.id);

      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      account.username 
      account.password = password || account.password ;
      account.role = role         || account.role ;

      await account.save();
      res.json(account);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating account' });
    }
  })

  // Xóa một tài khoản theo ID || chưa dùng , check kỹ data
  .delete( async (req: Request, res: Response) => {
    try {
      const account = await Account.findByPk(req.params.id);

      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      await account.destroy();
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting account' });
    }
  });

export default Account_Route;
