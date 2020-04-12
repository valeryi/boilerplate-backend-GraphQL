import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String
    },

    confirmed: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: "USER"
    }

}, {
    timestamps: true,
});

export const User = mongoose.model('User', userSchema);
