import {Request, Response, NextFunction} from "express"
import { QuestionController } from "../controllers/questionController"

export class QuestionRoutes { 
    
    public questionController: QuestionController = new QuestionController() 
    
    public routes(app): void {   
        
        app.route('/question')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next()
        }, this.questionController.getQuestions)        

        // POST endpoint
        .post(this.questionController.addNewQuestion)

        // Question details
        app.route('/question/:questionId')
        // get specific Question
        .get(this.questionController.getQuestionWithID)
        .put(this.questionController.updateQuestion)
        .delete(this.questionController.deleteQuestion)

    }
}