import fetch from 'node-fetch'
import * as mongoose from 'mongoose';
import { AuthorizedUserSchema } from '../models/authorizedUserModel';
import {UserController} from '../controllers/authorizedUserController';



let url=process.env.API_URL

let MOCK_DATA: any[] = [];

MOCK_DATA[0] = {
               question: 'How is our budget?'
                               }

MOCK_DATA[1] = {
    question: 'HOW IS THIS QUESTION??'
                    }

describe('The server', () => {

    it('fetches without crashing', () => {
        fetch(url + "/question")
        .then(res => res.json())
        .then(json => {
            console.log("We got:" + JSON.stringify(json) + " from get")
            expect(json).toBeDefined()
        })
        .catch(err => console.log("Error!:", err))
    })
    
    it('can post some data', () => {
        fetch(url + "/question",
            {
                method:'POST', body:JSON.stringify(MOCK_DATA[1]), headers: { 'Content-Type': 'application/json' }})
        .then(res => res.json())
        .then(json => {
            console.log("We got:" + JSON.stringify(json) + " from post")
            expect(json).toBeDefined()
        })
        .catch(err => console.log("Error!:", err))
    })
    
    it('response status gives a 401 error', () => {
        fetch(url + "/check")
        // .then(res => res.status)
        .then(res => {
            expect(res.status).toEqual(401)
            console.log("Right we got a error 0f 401 status!!!!!!!!!!!!!!!!")
        })
        .catch(err => console.log("Did not give 401 error"))
    })
    
    
    // it('Expect the user to be defined', done => {
    //     const AuthorizedUser = mongoose.model('User', AuthorizedUserSchema);

    //     let usercontrol = new UserController()
    //     let user: any
    //     let error: any
    //     console.log("I reached here")
    //     usercontrol.getUserIdPassword('chijioke', '787995ee388dd170bdb9cc986d3c6ab5a1229a72dae0c8eae4dd3a77a32d86f0', (error, user)=> {
    //         console.log("I am here")
    //         expect(user).toBeDefined()
    //         done()
    //     })
    // })
})

