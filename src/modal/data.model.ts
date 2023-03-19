import { Schema, model } from 'mongoose';

const dataSchema = new Schema({
  writer: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  isPublic: { type: Boolean, default: false, required: true },
}, {
  timestamps: true
});

const dataModal = model('Story', dataSchema);

export { dataModal };
