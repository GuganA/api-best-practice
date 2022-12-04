import {
  getAlldata,
  getData,
  createData,
  deleteData,
  updateData,
} from "../database/dataAcess/data.js";

const getAlldatas = () => {
  return new Promise((resolve) => {
    const data = getAlldata();
    console.log("service layer", data);
    resolve(data);
  });
};

const getOnedata = (id) => {
  return new Promise(async (resolve) => {
    const data = await getData(id);
    resolve(data);
  });
};

const createNewdata = (data) => {
  return new Promise(async (resolve) => {
    const newData = await createData(data);
    console.log("service layer create", newData);
    resolve(data);
  });
};

const updateOnedata = () => {
  return;
};

const deleteOnedata = () => {
  return;
};

export { getAlldatas, getOnedata, createNewdata, updateOnedata, deleteOnedata };
