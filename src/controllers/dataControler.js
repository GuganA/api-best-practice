import {
  getAlldatas as getAlldataService,
  getOnedata as getOnedataService,
  createNewdata as createNewdataService,
  updateOnedata as updateOnedataService,
  deleteOnedata as deleteOnedataService,
} from "../services/dataService.js";

const getAlldatas = (req, res) => {
  getAlldataService().then((allData) => {
    res.send({ status: "OK", Data: allData });
  });
};

const getOnedata = (req, res) => {
  getOnedataService(req.params.dataId).then((oneData) => {
    res.send({ status: "OK", Data: oneData });
  }).catch((err) => {
    res.send({ status: "Error", Error: err });
  })
};

const createNewdata = (req, res) => {
  res.send("Create a new data");
};

const updateOnedata = (req, res) => {
  res.send("Update an existing data");
};

const deleteOnedata = (req, res) => {
  res.send("Delete an existing data");
};

export { getAlldatas, getOnedata, createNewdata, updateOnedata, deleteOnedata };
