import {Request, Response, NextFunction} from "express"
import { QuestionController } from "../controllers/questionController"
import { voteController } from "../controllers/voteController"

export class QuestionRoutes { 
    
    public questionController: QuestionController = new QuestionController() 
    
    public routes(app): void {   
        

        // Question detail
        app.route('/vote/:voteVal/:questionId')
        // get specific Question
        .put(this.voteController.updateQuestion)
  

    }
}