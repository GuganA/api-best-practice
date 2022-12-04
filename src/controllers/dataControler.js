import {
  getAlldatas as getAlldataService,
  getOnedata as getOnedataService,
  createNewdata as createNewdataService,
  updateOnedata as updateOnedataService,
  deleteOnedata as deleteOnedataService,
} from "../services/dataService.js";

const getAlldatas = (req, res) => {
  getAlldataService().then((allData) => {
    return res.status(200).send({ status: "OK", Data: allData });
  });
};

const getOnedata = (req, res) => {
  getOnedataService(req.params.dataId).then((oneData) => {
    return res.send({ status: "OK", Data: oneData });
  }).catch((err) => {
    return res.send({ status: "Error", Error: err });
  })
};

const createNewdata = (req, res) => {
  if (!req?.body?.name || !req?.body?.description || !req?.body?.writer) {
    res.status(400).send({ status: "Error", Error: 'Please enter the missing data' })
  }
  createNewdataService(req.body).then((data) => {
    return res.send({ status: "OK", Data: data, message: "New data created" });
  }).catch((err) => {
    return res.send({ status: "Error", Error: err });
  })
};

const updateOnedata = (req, res) => {
  if (!req?.body?.name || !req?.body?.description || !req?.body?.writer) {
    res.status(400).send({ status: "Error", Error: 'Please enter the missing data' })
  }
  updateOnedataService(req.params.dataId, req.body).then((data) => {
    return res.send({ status: "OK", Data: data, message: "Data updated successfully" })
  }).catch((err) => {
    return res.send({ status: "Error", Error: err })
  })
};

const deleteOnedata = (req, res) => {
  deleteOnedataService(req.params.dataId).then((data) => {
    return res.status(400).send({ status: "OK", Data: data, message: "Delete an existing data" });

  }).catch((err) => {
    return res.send({ status: "Error", Error: err });
  })
};

export { getAlldatas, getOnedata, createNewdata, updateOnedata, deleteOnedata };
