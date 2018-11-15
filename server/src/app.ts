import * as express from "express"
import * as bodyParser from "body-parser"
import { QuestionRoutes } from "./routes/questionRoutes"
import { AppRoutes } from "./routes/appRoutes"
import { VoteRoutes } from "./routes/voteRoutes"
import {StatsRoutes } from "./routes/statsRoutes"
import * as mongoose from "mongoose"
import * as cookieParser from "cookie-parser"
import { CookieController } from "./controllers/cookieController";
class App {

    public app: express.Application
    public approuter: AppRoutes = new AppRoutes()
    public questionrouter: QuestionRoutes = new QuestionRoutes()
    public statsrouter: StatsRoutes = new StatsRoutes()
    public mongoUrl: string = 'mongodb://mongo/testdb'
    public voterouter: VoteRoutes = new VoteRoutes()

    constructor() {
        this.app = express()
        this.config()
        this.approuter.routes(this.app)
        this.questionrouter.routes(this.app)
        this.voterouter.routes(this.app)
        this.statsrouter.routes(this.app)
        this.mongoConnect()
    }

    private config(): void{
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        // serving static files 
        this.app.use(cookieParser())
        
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction)  => {
            if (req.cookies.usertag == undefined) {
                // while cookie is undefined, create new cookie
                CookieController.handleCookie(req, res, next)
                next()
            }else{
            next()
            }
        })
        this.app.use(express.static('public'))
    }

    private mongoConnect(): void{
        mongoose.Promise = global.Promise
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
    }
}

export default new App().app