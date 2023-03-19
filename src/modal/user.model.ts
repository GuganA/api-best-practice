import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please Enter valid Email Address'
        ]
    },
    name: { type: String, required: true },
    password: { 
        type: String, 
        required: true,
        minlength: 6
    },
    createdAt: { type: String },
    updatedAt: { type: String }
}, {
    timestamps: true
});

const UserModal = model('User', userSchema);

export { UserModal };
