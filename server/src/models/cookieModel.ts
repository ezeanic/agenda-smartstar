import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CookieSchema = new Schema({

    userCookie: {
        type: String,
        required: 'user must have a cookie id'
    },

    generatedDate: {
        type: Date,
        default: Date.now
    },

    updatedDate: {
        type: Date,
        default: 0
    }
});