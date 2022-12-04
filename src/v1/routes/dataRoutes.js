import express from "express";
import {
  getAlldatas,
  getOnedata,
  createNewdata,
  updateOnedata,
  deleteOnedata,
} from "../../controllers/dataControler.js";

const router = express.Router();

router.get("/", getAlldatas);

router.get("/:dataId", getOnedata);

router.post("/", createNewdata);

router.patch("/:dataId", updateOnedata);

router.delete("/:dataId", deleteOnedata);

export { router };
