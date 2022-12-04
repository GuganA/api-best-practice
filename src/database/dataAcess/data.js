import { Data } from "../modal/data.model.js";

const getAlldata = () => {
  return new Promise((resolve, reject) => {
    Data.find()
      .then((data) => {
        console.log("access layer", data);
        resolve(data);
      })
      .catch((error) => {
        console.erroror(error);
        reject(error);
      });
  });
};

const getData = async (dataId) => {
  return new Promise((resolve, reject) => {
    Data.findById(dataId)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const createData = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const writer = newData.writer;
      const name = newData.name;
      const description = newData.description;

      const createNewdata = new Data({
        writer,
        name,
        description,
      });

      await createNewdata.save();
      resolve("New Data Saved");
    } catch (error) {
      reject(error);
    }
  });
};

const deleteData = (dataId) => {
  return new Promise(async (resolve, reject) => {
    Data.findByIdAndDelete(dataId)
      .then((data) => {
        console.log(data);
        resolve("Data deleted");
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const updateData = (dataId, updateData) => {
  return new Promise(async (resolve, reject) => {
    Data.findById(dataId)
      .then((existingData) => {
        existingData.description = updateData.description;
        existingData.save();
        resolve(existingData);
      })
      .catch((erroror) => {
        console.erroror(erroror);
        reject(erroror);
      });
  });
};

export { getAlldata, getData, createData, deleteData, updateData };
