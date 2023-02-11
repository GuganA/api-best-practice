import { Data } from '../modal/data.model.js';
import logger from '../utils/logger.js'

const getAlldata = () => {
  return new Promise((resolve, reject) => {
    Data.find()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        logger.error({ error }, 'Error in fetching data.');
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
        logger.error({ error }, `Error in fetching data for ${dataId}.`);
        reject({ status: 400, error: error });
      });
  });
};

const createData = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const writer = newData.writer;
      const name = newData.name;
      const content = newData.content;
      const isPublic = newData.isPublic;


      const createNewdata = new Data({
        writer,
        name,
        content,
        isPublic,
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
      });

      await createNewdata.save();
      resolve(newData);
    } catch (error) {
      logger.error({ error }, `Error in creating data.`);
      reject({ status: 400, error: error });
    }
  });
};

const deleteData = (dataId) => {
  return new Promise(async (resolve, reject) => {
    Data.findByIdAndDelete(dataId)
      .then(() => {
        resolve('Data deleted');
      })
      .catch((error) => {
        logger.error({ error }, 'Error in deleting data.');
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
          content: updateData.description,
          writer: updateData.writer,
          isPublic: updateData.isPublic,
          updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
        },
      },
      { new: true },
      (error, data) => {
        if (error) {
          logger.error({ error }, `Error in updating data for ${dataId}.`);
          reject({ status: 400, error: error });
        } else {
          console.log(data);
          resolve(data);
        }
      });
  });
};

export { getAlldata, getData, createData, deleteData, updateData };
