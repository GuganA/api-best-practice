import {
  getAlldata as getAlldataService,
  getData as getOnedataService,
  createData as createNewdataService,
  updateData as updateOnedataService,
  deleteData as deleteOnedataService,
} from '../services/dataService.js';

const getAlldatas = (req, res) => {
  getAlldataService().then((allData) => {
    return res.status(200).send({ status: 'OK', Data: allData });
  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
  });
};

const getOnedata = (req, res) => {
  getOnedataService(req.params.dataId).then((oneData) => {
    return res.send({ status: 'OK', Data: oneData });
  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
  })
};

const createNewdata = (req, res) => {
  if (!req?.body?.name || !req?.body?.description || !req?.body?.writer) {
    res.status(err?.status || 500).send({ status: 'Error', Error: 'Please enter the missing data' })
  }
  createNewdataService(req.body).then((data) => {
    return res.send({ status: 'OK', Data: data, message: 'New data created' });
  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
  })
};

const updateOnedata = (req, res) => {
  if (!req?.body?.name || !req?.body?.description || !req?.body?.writer) {
    res.status(error?.status || 500).send({ status: 'Error', Error: 'Please enter the missing data' })
  }
  updateOnedataService(req.params.dataId, req.body).then((data) => {
    return res.send({ status: 'OK', Data: data, message: 'Data updated successfully' })
  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error })
  })
};

const deleteOnedata = (req, res) => {
  deleteOnedataService(req.params.dataId).then((data) => {
    return res.status(400).send({ status: 'OK', Data: data, message: 'Delete an existing data' });

  }).catch((err) => {
    return res.status(err?.status || 500).send({ status: 'Error', Error: err.error });
  })
};

export { getAlldatas, getOnedata, createNewdata, updateOnedata, deleteOnedata };
