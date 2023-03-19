import { dataModal } from '../modal';
import { logger } from '../utils'

class Data {
  getAlldata = () => {
    return new Promise((resolve, reject) => {
      dataModal.find()
        .then((data: any) => {
          resolve(data);
        })
        .catch((error) => {
          logger.error({ error }, 'Error in fetching data.');
          reject({ status: 400, error: error });
        });
    });
  };

  getData = async (dataId: string) => {
    return new Promise((resolve, reject) => {
      dataModal.findById(dataId)
        .then((data: any) => {
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

  createData = (newData: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const writer = newData.writer;
        const name = newData.name;
        const content = newData.content;
        const isPublic = newData.isPublic;


        await dataModal.create({
          writer,
          name,
          content,
          isPublic,
        });

        resolve(newData);
      } catch (error) {
        logger.error({ error }, `Error in creating data.`);
        reject({ status: 400, error: error });
      }
    });
  };

  deleteData = (dataId: string) => {
    return new Promise(async (resolve, reject) => {
      dataModal.findByIdAndDelete(dataId)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          logger.error({ error }, 'Error in deleting data.');
          reject({ status: 400, error: error });
        });
    });
  };

  updateData = (dataId: string, updateData: any) => {
    return new Promise(async (resolve, reject) => {
      dataModal.findOneAndUpdate(
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
            resolve(data);
          }
        });
    });
  };
}

const data = new Data();

export default data;