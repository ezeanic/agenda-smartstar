import * as mongoose from 'mongoose';
import { QuestionSchema } from '../models/questionModel';
import { Request, Response } from 'express';

const Question = mongoose.model('Question', QuestionSchema);

export class QuestionController{

    public addNewQuestion (req: Request, res: Response) {                
        let newQuestion = new Question(req.body);
    
        newQuestion.save((err, Question) => {
            if(err){
                res.send(err);
            }    
            res.json(Question);
        });
    }

 
    public getQuestionWithID (req: Request, res: Response) {           
        Question.findById(req.params.questionId, (err, Question) => {
            if(err){
                res.send(err);
            }
            res.json(Question);
        });
    }



    
}