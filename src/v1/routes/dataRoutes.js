import express from "express";
import {
  getAlldatas,
  getOnedata,
  createNewdata,
  updateOnedata,
  deleteOnedata,
} from "../../controllers/dataControler.js";

const router = express.Router();

/**
 * @openapi
 * /api/v1/data:
 *   get:
 *     tags:
 *       - data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 * 
 */
router.get("/", getAlldatas);

router.get("/:dataId", getOnedata);

router.post("/", createNewdata);

router.put("/:dataId", updateOnedata);

router.delete("/:dataId", deleteOnedata);

export { router };
