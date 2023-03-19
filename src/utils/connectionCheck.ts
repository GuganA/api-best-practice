import { connect } from 'mongoose';
import { logger, config } from './index';

export const checkConnection = async () => {
  try {
    const url = config.mongoDBURI;
    await connect(url);
    logger.info('Connected to Mongo database')
  } catch (err) {
    logger.error({ err: err }, 'Error in connecting Mongodb');
    process.exit(1);
  }
};
