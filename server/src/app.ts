import * as express from "express"
import * as bodyParser from "body-parser"
import { ContactRoutes } from "./routes/contactRoutes"
import { AppRoutes } from "./routes/appRoutes"
import * as mongoose from "mongoose"

class App {

    public app: express.Application
    public approuter: AppRoutes = new AppRoutes()
    public contactrouter: ContactRoutes = new ContactRoutes()
    public mongoUrl: string = 'mongodb://mongo/testdb'

    constructor() {
        this.app = express()
        this.config()
        this.approuter.routes(this.app)
        this.contactrouter.routes(this.app)
        this.mongoConnect()
    }

    private config(): void{
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        // serving static files 
        this.app.use(express.static('public'))
    }

    private mongoConnect(): void{
        mongoose.Promise = global.Promise
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
    }
}

export default new App().app