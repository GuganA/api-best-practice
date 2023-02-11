import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
}, {
    timestamps: true
});

const User = model('User', userSchema);

export { User };