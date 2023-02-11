import express from 'express';
import bodyParser from 'body-parser';
import { router as routerV1 } from './v1/routes/dataRoutes.js';
import { checkConnection } from './utils/connectionCheck.js';
import apicache from 'apicache';
import swaggerDocs from './v1/swagger.js';
import logger from './utils/logger.js';
import { config } from './utils/config.js';

const app = express();
const port = config.port || 3000;
const cache = apicache.middleware;

app.use(bodyParser.json());
app.use(cache(2))

checkConnection();

app.get('/', (req, res) => {
  res.send(`<b>Check Health....</b>
            <a href='/api/v1/data/healthCheck'>HealthCheck</a>
  `);
});

app.use('/api/v1/data', routerV1);

app.listen(port, () => {
  swaggerDocs(app, port);
  logger.info(`listening on port http://localhost:${port}`);
  console.log(`listening on port http://localhost:${port}`);
});
