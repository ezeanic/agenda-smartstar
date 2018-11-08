import {Request, Response, NextFunction} from "express"
import { QuestionStatsController } from "../controllers/questionStatsController"
import { QuestionSchema } from '../models/questionModel';
//const Question = mongoose.model('Question', QuestionSchema);

export class StatsRoutes { 
    
    public statsController: QuestionStatsController= new QuestionStatsController() 
    
    public routes(app): void {   
        

        // Question Stats detail
        //app.route('/stats/:questionId')
        // get specific Question
        //.get(this.statsController.getQuestionsStats)
        //.post(this.statsController.getQuestionsStats)

        app.route('/stats')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`)
            console.log(`Request type: ${req.method}`)
            next()
        }, this.statsController.getQuestionsStats) 
        .post(this.statsController.getQuestionsStats)
  

    }
}