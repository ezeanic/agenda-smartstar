import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const QuestionSchema = new Schema({
    id: {
        type: String
    },
    question: {
        type: String,
        required: 'Enter a question'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});