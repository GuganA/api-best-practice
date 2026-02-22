import express from 'express';
import { Data, User } from './v1/routes';
import { checkConnection, logger, config, swaggerDocs } from './utils';
import cookieParser from 'cookie-parser';
import apicache from 'apicache';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const port = config.PORT || 3000;
const cache = apicache.middleware;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(express.static('public'));
app.use(cors({
  origin: config.FRONT_END_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // explicitly allow common methods including OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'],   // allow necessary headers
}));
app.use(helmet()); // for secure headers
app.use(limiter); // rate limiter
app.use(express.json()); // Parsing json Objects
app.use(cookieParser()); // Parsing cookie
app.use(cache(2)); // Server Cache

checkConnection();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/v1/healthCheck', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/v1/stories', Data);
app.use('/api/v1/users', User);

app.listen(port, () => {
  swaggerDocs(app, port);
  logger.info(`listening on port http://localhost:${port}`);
  console.log(`listening on port http://localhost:${port}`);
});
