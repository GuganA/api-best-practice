import express from 'express';
import bodyParser from 'body-parser';
import { Data, User } from './v1/routes';
import { checkConnection, logger, config, swaggerDocs } from './utils';
import cookieParser from 'cookie-parser';
import apicache from 'apicache';

const app = express();
const port = config.port || 3000;
const cache = apicache.middleware;

app.use(bodyParser.json()); // Parsing json Objects
app.use(cookieParser()); // Parsing cookie
app.use(cache(2)); // Server Cache

checkConnection();

app.get('/', (req, res) => {
  res.send(`<b>Check Health....</b>
            <a href='/api/v1/data/healthCheck'>HealthCheck</a>
  `);
});

app.use('/api/v1/data', Data);
app.use('/api/v1/users', User);

app.listen(port, () => {
  swaggerDocs(app, port);
  logger.info(`listening on port http://localhost:${port}`);
  console.log(`listening on port http://localhost:${port}`);
});
