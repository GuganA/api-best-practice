import { data } from '../services';
import { Request, Response } from 'express';

export const getAlldatas = (req: Request, res: Response) => {
  data.getAlldata().then((allData: any) => {
    return res.status(200).send({ status: 'OK', Data: allData });
  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
  });
};

export const getOnedata = (req: Request, res: Response) => {
  data.getData(req.params.dataId).then((oneData: any) => {
    return res.send({ status: 'OK', Data: oneData });
  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
  })
};

export const createNewdata = (req: Request, res: Response) => {
  if (!req?.body?.name || !req?.body?.description || !req?.body?.writer) {
    res.status(500).send({ status: 'Error', Error: 'Please enter the missing data' })
  }
  data.createData(req.body).then((data: any) => {
    return res.send({ status: 'OK', Data: data, message: 'New data created' });
  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
  })
};

export const updateOnedata = (req: Request, res: Response) => {
  if (!req?.body?.name || !req?.body?.description || !req?.body?.writer) {
    res.status(500).send({ status: 'Error', Error: 'Please enter the missing data' })
  }
  data.updateData(req.params.dataId, req.body).then((data: any) => {
    return res.send({ status: 'OK', Data: data, message: 'Data updated successfully' })
  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error })
  })
};

export const deleteOnedata = (req: Request, res: Response) => {
  data.deleteData(req.params.dataId).then(() => {
    return res.status(400).send({ status: 'OK', message: 'Delete an existing data' });

  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
  })
};
