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
        Question.findById(req.params.questionId, (err, QuestionObject) => { //check voteVals 
            if(err){
                res.send(err);
            }

            switch(req.params.voteVal){
                case"upVote":
                    if( QuestionObject.downVoteCookies.indexOf(req.cookies.usertag) != -1){ // remove and save
                        delete QuestionObject.downVoteCookies[req.cookies.usertag]
                        QuestionObject.save( (err) => { 
                            if(err)  {
                                res.send(err);
                            }
                            res.send({err:false, msg:"Yeah!"});
                        })
                    }
                    else if( QuestionObject.upVoteCookies.indexOf(req.cookies.usertag) != -1){
                        res.send({err:true, msg:"Dang!"}); // send error 
                    }
                    else { // add to upVote
                        QuestionObject.upVoteCookies.push(req.cookies.usertag)
                    }
                    break;

                case"downVote":
                    if( QuestionObject.downVoteCookies.indexOf(req.cookies.usertag) != -1){
                        
                        res.send({err:true, msg:"Dang!"}); // send error 
                    }
                    else if( QuestionObject.upVoteCookies.indexOf(req.cookies.usertag) != -1){
                        // remove from upVote 
                        delete QuestionObject.upVoteCookies[req.cookies.usertag]
                        QuestionObject.save( (err) => { 
                            if(err)  {
                                res.send(err);
                            }
                            res.send({err:false, msg:"Yeah!"});
                        })
                    }
                    else {
                        //add to downVote
                        QuestionObject.upVoteCookies.push(req.cookies.usertag)
                        QuestionObject.save( (err) => { 
                            if(err)  {
                                res.send(err);
                            }
                            res.send({err:false, msg:"Yeah!"});
                        })
                    }
                    break;
            }// switch
                

            res.json(QuestionObject);
        });
    }

}