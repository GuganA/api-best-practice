import {
  getAlldata,
  getData,
  createData,
  deleteData,
  updateData,
} from "../database/dataAcess/data.js";

const getAlldatas = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getAlldata();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

const getOnedata = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getData(id);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

const createNewdata = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newData = await createData(data);
      resolve(newData);
    } catch (err) {
      reject(err);
    }
  });
};

const updateOnedata = (dataId, _data) => {
  return new Promise(async (resolve, reject) => {
    try {
      getOnedata(dataId).then((oneData) => {
        if (oneData === 'No Data found') {
          reject('No Data found');
        } else {
          const updateDataById = updateData(dataId, data);
          resolve(updateDataById);
        }
      }).catch((err) => {
        reject(err);
      })
    } catch (err) {
      reject(err);
    }
  });
};

const deleteOnedata = (dataId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteDataById = deleteData(dataId);
      resolve(deleteDataById);
    } catch (err) {
      reject(err);
    }
  });
};

export { getAlldatas, getOnedata, createNewdata, updateOnedata, deleteOnedata };
