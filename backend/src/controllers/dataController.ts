import { data } from '../services';
import { Request, Response } from 'express';

export const getAlldatas = (req: Request, res: Response) => {
  const isPrivate = req.query.private;
  const userId = (req as any).user.id;
  data.getAlldata({ isPrivate, userId }).then((allData: any) => {
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
  if (!req?.body?.title || !req?.body?.content) {
    res.status(500).send({ status: 'Error', Error: 'Please enter the missing data' })
  }
  const userId = (req as any).user.id;
  data.createData({ ...req.body, writer: userId }).then((data: any) => {
    return res.send({ status: 'OK', Data: data, message: 'New data created' });
  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
  })
};

export const updateOnedata = (req: Request, res: Response) => {
  if (!req?.body?.title || !req?.body?.content) {
    res.status(500).send({ status: 'Error', Error: 'Please enter the missing data' })
  }
  const userId = (req as any).user.id;
  data.updateData(req.params.dataId, { ...req.body, writer: userId }).then((data: any) => {
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
