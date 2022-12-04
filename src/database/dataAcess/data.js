import { Data } from "../modal/data.model.js";

const getAlldata = () => {
  return new Promise((resolve, reject) => {
    Data.find()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getData = async (dataId) => {
  return new Promise((resolve, reject) => {
    Data.findById(dataId)
      .then((data) => {
        if (!data) {
          resolve('No Data found');
        }
        resolve(data);
      })
      .catch((error) => {
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
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
      });

      await createNewdata.save();
      resolve(newData);
    } catch (error) {
      reject(error);
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
        reject(error);
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
          // createdAt: ,
          updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
        },
      },
      { new: true },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log(data);
          resolve(data);
        }
      });
  });
};

export { getAlldata, getData, createData, deleteData, updateData };
