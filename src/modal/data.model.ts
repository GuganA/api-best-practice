import { Schema, model } from 'mongoose';

const dataSchema = new Schema({
  writer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPublic: { type: Boolean, default: false, required: true },
  tags: [{ type: String }],
  slug: { type: String, unique: true, required: true }
}, {
  timestamps: true
});

const dataModal = model('Story', dataSchema);

export { dataModal };
