import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const QuestionSchema = new Schema({

    question: {
        type: String,
        required: 'Enter a question'
    },

    upVoteCookies: [{ type: String}],
    
    downVoteCookies: [{type: String}],

    postDate: {
        type: Date,
        default: Date.now
    }

});