import express from 'express';
import {
  getAlldatas,
  getOnedata,
  createNewdata,
  updateOnedata,
  deleteOnedata,
} from '../../controllers/dataControler.js';

const router = express.Router();

router.get('/healthCheck', (req, res) => { res.sendStatus(200) });

router.get('/', getAlldatas);

router.get('/:dataId', getOnedata);

router.post('/', createNewdata);

router.put('/:dataId', updateOnedata);

router.delete('/:dataId', deleteOnedata);

export { router };
