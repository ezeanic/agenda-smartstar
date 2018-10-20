import {Request, Response, NextFunction} from "express"

export class AppRoutes { 

    public routes(app): void {   

        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Houston, we have contact.'
            })
        })
    }
}