import * as mongoose from 'mongoose';
import { AuthorizedUserSchema } from '../models/authorizedUserModel';
import { Request, Response } from 'express';
import * as crypto from 'crypto'

const AuthorizedUser = mongoose.model('User', AuthorizedUserSchema);

export class UserController{

    public getUserIdPassword (userName:string, hash:string, done:(error:any, user?:any)=> void) {           
        AuthorizedUser.find({"userName": userName}, (err, userlist) => {
            if(err){
                console.log(err)
                done(err,false);
            }

            if(userlist.length === 0){
                done(null, false)
            }
            
            //checks password
            if(userlist[0].password == hash){
                done(null, {userName:userName})
            } else {
                done(null, false)
            }

        });
    }

}