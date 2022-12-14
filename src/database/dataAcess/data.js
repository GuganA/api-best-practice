import { Data } from "../modal/data.model.js";

const getAlldata = () => {
  return new Promise((resolve, reject) => {
    Data.find()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject({ status: 400, error: error });
      });
  });
};

const getData = async (dataId) => {
  return new Promise((resolve, reject) => {
    Data.findById(dataId)
      .then((data) => {
        if (!data) {
          reject({ status: 404, error: 'No Data found' });
        }
        resolve(data);
      })
      .catch((error) => {
        reject({ status: 400, error: error });
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
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
      });

      await createNewdata.save();
      resolve(newData);
    } catch (error) {
      reject({ status: 400, error: error });
    }
  });
};

const deleteData = (dataId) => {
  return new Promise(async (resolve, reject) => {
    Data.findByIdAndDelete(dataId)
      .then(() => {
        resolve("Data deleted");
      })
      .catch((error) => {
        reject({ status: 400, error: error });
      });
  });
};

const updateData = (dataId, updateData) => {
  return new Promise(async (resolve, reject) => {
    Data.findOneAndUpdate(
      { _id: dataId },
      {
        $set: {
          name: updateData.name,
          description: updateData.description,
          writer: updateData.writer,
          updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
        },
      },
      { new: true },
      (error, data) => {
        if (error) {
          reject({ status: 400, error: error });
        } else {
          console.log(data);
          resolve(data);
        }
      });
  });
};

export { getAlldata, getData, createData, deleteData, updateData };
