import { Router, Request, Response } from 'express';
import {
  getAlldatas,
  getOnedata,
  createNewdata,
  updateOnedata,
  deleteOnedata,
} from '../../controllers';

const router = Router();

router.get('/health-check', (req: Request, res: Response) => { res.sendStatus(200) });

router.get('/', getAlldatas);

router.get('/:dataId', getOnedata);

router.post('/', createNewdata);

router.put('/:dataId', updateOnedata);

router.delete('/:dataId', deleteOnedata);

export { router };
