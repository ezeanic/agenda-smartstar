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

    upVoteCookies: [{ type: String}],
    
    downVoteCookies: [{type: String}],

    flagCount: {
        type: Number,
        default: 0
    },

    postDate: {
        type: Date,
        default: Date.now
    }

});