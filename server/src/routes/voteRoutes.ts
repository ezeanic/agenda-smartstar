import {Request, Response, NextFunction} from "express"
// import { QuestionController } from "../controllers/questionController"
import { VoteController } from "../controllers/voteController"

export class VoteRoutes { 
    
    public voteController: VoteController= new VoteController() 
    
    public routes(app): void {   
        

        // Question detail
        app.route('/vote/:voteVal/:questionId')
        // get specific Question
        .get(this.voteController.handleVote)
  

    }
}