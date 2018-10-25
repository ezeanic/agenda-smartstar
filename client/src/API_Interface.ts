import {ContactEntry} from './ContactEntry'
import {QuestionEntry} from './QuestionEntry'

function FetchContacts(api_url: string, responseHandler: (theList:ContactEntry[]) => void) {
    fetch(api_url)
    .then( (response) => { 
            return response.json(); }
            )
    .then( (json) => {
        let theList: ContactEntry[] = []
        for (let item of json) {
            theList.push({
                firstName:item.firstName,
                lastName:item.lastName,
                email:item.email,
                company:item.company,
                phone:item.phone,
                created:item.created
            })
        }
        responseHandler(theList)
    })
    .catch( (err) => {
            console.log(`err : ${err}`);
    })
}

function FetchQuestions(api_url: string, responseHandler: (theList:QuestionEntry[]) => void) {
    fetch(api_url)
    .then( (response) => { 
            return response.json(); }
            )
    .then( (json) => {
        let theList: QuestionEntry[] = []
        for (let item of json) {
            theList.push({
                question:item.question,
                postDate:new Date(item.postDate),
                upVoteCookies:item.upVoteCookies,
                downVoteCookies:item.downVoteCookies,
                flagCount:item.flagCount,
             
            })
        }
        responseHandler(theList)
    })
    .catch( (err) => {
            console.log(`err : ${err}`);
    })
}

export {FetchQuestions, FetchContacts}