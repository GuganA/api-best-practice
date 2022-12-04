import { Schema, model } from "mongoose";

const dataSchema = new Schema({
  writer: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const Data = model("data", dataSchema);

export { Data };
