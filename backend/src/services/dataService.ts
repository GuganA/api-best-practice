import slugify from 'slugify';
import { dataModal } from '../modal';
import { logger } from '../utils'

class Data {
  getAlldata = (filter: any) => {
    return new Promise((resolve, reject) => {
      let payload: any = {
        isPublic: true,

      };
      if (filter.isPrivate) {
        payload.isPublic = false;
        payload.writer = filter.userId
      }
      dataModal.find(payload)
        .then((data: any) => {
          return resolve(data);
        })
        .catch((error) => {
          logger.error({ error }, 'Error in fetching data.');
          return reject({ status: 400, error: error });
        });
    });
  };

  getData = (dataId: string) => {
    return new Promise((resolve, reject) => {
      dataModal.findById(dataId)
        .then((data: any) => {
          if (!data) {
            return reject({ status: 404, error: 'No Data found' });
          }
          return resolve(data);
        })
        .catch((error) => {
          logger.error({ error }, `Error in fetching data for ${dataId}.`);
          return reject({ status: 400, error: error });
        });
    });
  };

  createData = (newData: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { writer, title, content, isPublic } = newData;
        const slug = slugify(title, { lower: true, strict: true });

        const data = await dataModal.create({
          writer,
          title,
          content,
          isPublic,
          slug
        });

        return resolve(data);
      } catch (error) {
        logger.error({ error }, `Error in creating data.`);
        return reject({ status: 400, error: error });
      }
    });
  };

  deleteData = (dataId: string) => {
    return new Promise((resolve, reject) => {
      dataModal.findByIdAndDelete(dataId)
        .then(() => {
          return resolve(true);
        })
        .catch((error) => {
          logger.error({ error }, 'Error in deleting data.');
          return reject({ status: 400, error: error });
        });
    });
  };

  updateData = (dataId: string, updateData: any) => {
    return new Promise((resolve, reject) => {
      dataModal.findOneAndUpdate(
        { _id: dataId },
        {
          $set: {
            title: updateData.title,
            content: updateData.content,
            writer: updateData._id,
            isPublic: updateData.isPublic,
            slug: slugify(updateData.title, { lower: true, strict: true }),
            updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
          },
        },
        { new: true },
        (error, data) => {
          if (error) {
            logger.error({ error }, `Error in updating data for ${dataId}.`);
            return reject({ status: 400, error: error });
          } else {
            return resolve(data);
          }
        });
    });
  };
}

const data = new Data();

export default data;