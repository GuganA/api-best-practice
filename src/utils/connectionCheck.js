import pkg from 'mongoose';
import logger from './logger.js';
import { config } from './config.js';

const { connect } = pkg;

export const checkConnection = async () => {
  try {
    const url = config.mongoDBURI;
    await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to Mongo database')
  } catch (err) {
    logger.error({ err: err }, 'Error in connecting Mongodb');
    process.exit(1);
  }
};
