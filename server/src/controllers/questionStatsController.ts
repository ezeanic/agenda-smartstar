import * as mongoose from 'mongoose';
import { QuestionSchema } from '../models/questionModel';
import { Request, Response } from 'express';

const Question = mongoose.model('Question', QuestionSchema);

export class QuestionStatsController{

    static mapQuestionModelToResponse(item: any, usertag:string) {
        const newObj = { question: item.question,
                         numUpVotes: item.upVoteCookies.length,
                         numDownVotes: item.downVoteCookies.length,
                         canUpVote: item.upVoteCookies.indexOf(usertag) == -1,
                         canDownVote: item.downVoteCookies.indexOf(usertag) == -1,
                         flagCount: item.flagCount,
                         postDate: item.postDate,
                         _id:item._id}
        return newObj
    }

    public getQuestionsStats (req: Request, res: Response) {
        Question.find({})
        .then((qList) => {
             // put in your code here to convert the list of question objects to a list of objects expected by the client. 
             // Hint: Use the static method above in a loop or a map.

             let ret:any[] = []
             for(let i in qList ) {
                 ret.push(QuestionStatsController.mapQuestionModelToResponse(qList[i], req.cookies.usertag))
             }
             res.send(ret)
        })
        .catch((err) => {
            res.send(err)
        })
    }

}