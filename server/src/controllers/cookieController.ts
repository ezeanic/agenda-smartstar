import * as mongoose from 'mongoose';
import { CookieSchema } from '../models/cookieModel';
import { Request, Response, NextFunction} from 'express';

const Cookie = mongoose.model('Cookie', CookieSchema);

export class CookieController{ 
    public static handleCookie(req: Request, res: Response, next: NextFunction){
        const randomNumber=Math.random().toString().slice(2)
        Cookie.find({userCookie: randomNumber})
        .then((result) =>{
            if(!result.length){
                res.cookie('usertag',randomNumber, { maxAge: 24*365*3600*1000, httpOnly: true })
                let newCookie = new Cookie({userCookie: randomNumber})
                newCookie.save()
                .then((newCookie) => {
                    next()
                })
            }else{
                CookieController.handleCookie(req, res, next)
            }
        })
    }
}    