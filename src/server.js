import express from "express";
import bodyParser from "body-parser";
import { router as routerV1 } from "./v1/routes/dataRoutes.js";
import { checkConnection } from "./connectionCheck.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

checkConnection();

app.get("/", (req, res) => {
  res.send(`<b>Working....</b>`);
});

app.use("/api/v1/data", routerV1);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
