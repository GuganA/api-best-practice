import express from "express";
import bodyParser from "body-parser";
import { router as routerV1 } from "./v1/routes/dataRoutes.js";
import { checkConnection } from "./connectionCheck.js";
import apicache from "apicache";
import swaggerDocs from "./v1/swagger.js";

const app = express();
const port = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(bodyParser.json());
app.use(cache('2 minutes'))

checkConnection();

app.get("/", (req, res) => {
  res.send(`<b>Working....</b>`);
});

app.use("/api/v1/data", routerV1);

app.listen(port, () => {
  swaggerDocs(app, port);
  console.log(`listening on port http://localhost:${port}`);
});
