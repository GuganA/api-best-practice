import logger from 'pino';
import path from 'path';
import fs from 'fs';

const loggerOptions = {
    base:{},
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
};

const logPath = path.join(process.cwd(), '/log/');

if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

const logDestination = logger.destination(`${logPath}app.log`);
const log = logger(loggerOptions, logDestination);

export default log;