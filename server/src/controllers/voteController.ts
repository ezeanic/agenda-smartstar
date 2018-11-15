import * as mongoose from 'mongoose';
import { QuestionSchema } from '../models/questionModel';
import { Request, Response } from 'express';

const Question = mongoose.model('Question', QuestionSchema);

export class VoteController{
    public handleVote (req: Request, res: Response) {
        //debugger
        Question.findById(req.params.questionId)
        .then((QuestionObject) => { //check voteVals 
            switch(req.params.voteVal){
                case"upVote":
                    let dix = QuestionObject.downVoteCookies.indexOf(req.cookies.usertag)
                    if( dix != -1){ // remove
                        QuestionObject.downVoteCookies.splice(dix,1)
                    }
                    if(QuestionObject.upVoteCookies.indexOf(req.cookies.usertag) != -1){ // remove
                        throw new Error("Sorry, cannot upVote more than once")
                    }
                    QuestionObject.upVoteCookies.push(req.cookies.usertag)
                    console.log('saved up vote from ' + req.cookies.usertag)
                    return QuestionObject.save()

                case"downVote":
                    let uix = QuestionObject.upVoteCookies.indexOf(req.cookies.usertag)
                    if( uix != -1){ // remove
                        QuestionObject.upVoteCookies.splice(uix,1)
                    }
                    if(QuestionObject.downVoteCookies.indexOf(req.cookies.usertag) != -1){ // remove
                        throw new Error("Sorry, cannot downVote more than once")
                    }
                    QuestionObject.downVoteCookies.push(req.cookies.usertag)
                    console.log('saved down vote from ' + req.cookies.usertag)
                    return QuestionObject.save()

                case"notUpVote":
                    let choice = QuestionObject.upVoteCookies.indexOf(req.cookies.usertag)
                    if(QuestionObject.upVoteCookies.indexOf(req.cookies.usertag) == -1){ // remove
                        throw new Error("Sorry, unable to change vote. Vote not avaliable. Error code: U345yhedjhisdj")
                    }
                    if( choice != -1){ // remove
                        QuestionObject.upVoteCookies.splice(choice,1)
                    }
                    console.log('saved not up vote from ' + req.cookies.usertag)
                    //QuestionObject.upVoteCookies.push(req.cookies.usertag)
                    return QuestionObject.save()


                case"notDownVote":
                    let userSelection = QuestionObject.downVoteCookies.indexOf(req.cookies.usertag)
                    if(QuestionObject.downVoteCookies.indexOf(req.cookies.usertag) == -1){ //  (== -1 means it is not there)
                        throw new Error("Sorry, unable to change vote. Vote not avaliable. Error code: Djfdklfndknf23")
                    }
                    if( userSelection != -1){ // remove
                        QuestionObject.downVoteCookies.splice(userSelection,1)
                    }
                    
                    //QuestionObject.downVoteCookies.push(req.cookies.usertag)
                    console.log('saved not down vote from ' + req.cookies.usertag)
                    return QuestionObject.save()

                default:
                    throw new Error("voteVal action not implmented")
            }
        })
        .then((updatedQuestion) => {
            return res.json({msg: 'model updated', err: false})
        })
        .catch((errorMsg) => {
            return res.json({msg: errorMsg.message, err:true})
        })
    }
}