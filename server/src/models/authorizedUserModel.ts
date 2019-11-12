import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AuthorizedUserSchema = new Schema({
    userName: {
        type: String,
        required: 'Enter your username'
    },
  
    password: {
        type: String,
        required: 'Enter a password'
    }
})