import {Request, Response, NextFunction} from "express"
import { QuestionController } from "../controllers/questionController"
import { VoteController } from "../controllers/voteController"

export class VoteRoutes { 
    
    public VoteController: QuestionController = new QuestionController() 
    
    public routes(app): void {   
        

        // Question detail
        app.route('/vote/:voteVal/:questionId')
        // get specific Question
        .put(this.VoteController.updateQuestion)
  

    }
}