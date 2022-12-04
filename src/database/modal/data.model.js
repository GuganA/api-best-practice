import { Schema, model } from "mongoose";

const dataSchema = new Schema({
  writer: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true }
});

const Data = model('Data', dataSchema);

export { Data };
