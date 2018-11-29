import * as mongoose from 'mongoose'
import { Request, Response, NextFunction} from 'express';

class MockRandom {
    /*
    ** define a random function that we control. The first three "random" numbers
    ** are fixed. After that, use Math.random
    */
    private static rList = [.111111, .222222, .333333]
    private count:number=0
    private static origMathRandom = Math.random
    
    public random() {
        let result:number
        if (this.count < MockRandom.rList.length) {
            result = MockRandom.rList[this.count++]
        } else {
            result = MockRandom.origMathRandom()
        }
        return result
    }

    public resetCount() {
        // restart at the beginning

        this.count = 0
    }
}

class MockResponse {
    public name:string
    public value:string
    public options:any
    
    public cookie(name:string, value:string, options:any) {
        this.name = name
        this.value = value
        this.options = options
    }
}
       
class MockCookie {
    /*
    ** Mock out the features of the Cookie Schema
    */
    
    constructor (testJSON: any) {
        this.myCookieValue = testJSON.userCookie
    }

    static myStorage:any = {}
    private myCookieValue: string = ''
    
    public static find(testJSON: any) {
        const result = MockCookie.myStorage[testJSON.userCookie]
        if (result) {
            return Promise.resolve([result])
        } else {
            return Promise.resolve([])
        }
    }
    
    public save() {
        return new Promise(resolve => {
            MockCookie.myStorage[this.myCookieValue] = true
            resolve(this)
        })
    }
}

let cookieModel = (mname:string, schema:any) => {
    return MockCookie
}

let oldModel = mongoose.model

mongoose.model = cookieModel

import {CookieController} from "../controllers/cookieController"

mongoose.model = oldModel

describe('the cookie controller', () => {

    it('is defined', () => {
        expect(CookieController).toBeDefined()
    })
    
    it('handleCookie is defined', () => {
        expect(CookieController.handleCookie).toBeDefined()
    })
    
    it('handles base case', (done) => {
        MockCookie.myStorage = {}
        let myRandom = new MockRandom()
        let random = myRandom.random.bind(myRandom)
        global.Math.random = random
        let res = new MockResponse()
        CookieController.handleCookie({} as unknown as Request, res as unknown as Response, () => {
            expect(res.name).toEqual('usertag')
            expect(res.value).toEqual('111111')
            done()
        })
    })
    
    it('handles duplicate case', (done) => {
        /*
        // force random number reuse
       */
        MockCookie.myStorage = {}
        let myRandom = new MockRandom()
        let random = myRandom.random.bind(myRandom)
        global.Math.random = random
        let res = new MockResponse()
        CookieController.handleCookie({} as unknown as Request, res as unknown as Response, () => {
            expect(res.name).toEqual('usertag')
            expect(res.value).toEqual('111111')
            /*
            ** Now force reuse of the same random number
            */
            myRandom.resetCount()
            let res2 = new MockResponse()
            CookieController.handleCookie({} as unknown as Request, res2 as unknown as Response, () => {
                expect(res2.name).toEqual('usertag')
                expect(res2.value).toEqual('222222')
                done()
            })
        })
    })
})
