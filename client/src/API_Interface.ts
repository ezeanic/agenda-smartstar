import {QuestionEntry, VoteValidation} from './QuestionEntry'

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
                numUpVotes:item.numUpVotes,
                canUpVote:item.canUpVote,
                numDownVotes:item.numDownVotes,
                canDownVote:item.canDownVote,
                flagCount:item.flagCount,
                _id:item._id
            })
        }
        responseHandler(theList)
    })
    .catch( (err) => {
        responseHandler([])
    })
}

function FetchVoting(api_url: string, responseHandler: (authentication:VoteValidation) => void) {
    fetch(api_url)
    .then( (response) => {
            return response.json(); }
            )
    .then( (json) => {
        responseHandler(json)
    })
    .catch( (err) => {
        responseHandler({err: true, msg: "Error: cannot validate."})
    })
}

function Voting(root_url: string,_id: string, vote: string, responseHandler: (authentication:VoteValidation) => void){
    //create url and send to fetch voting
    FetchVoting(root_url + "/vote/" + vote + "/" + _id ,responseHandler)
}

function UpVote(root_url: string,_id: string, responseHandler: (authentication:VoteValidation) => void){
    return Voting(root_url ,_id, "upVote", responseHandler)
}

function DownVote(root_url: string,_id: string, responseHandler: (authentication:VoteValidation) => void){
    return Voting(root_url,_id, "downVote",responseHandler)
}
function NotUpVote(root_url: string,_id: string, responseHandler: (authentication:VoteValidation) => void){
    return Voting(root_url,_id, "notUpVote", responseHandler)
}

function NotDownVote(root_url: string,_id: string, responseHandler: (authentication:VoteValidation) => void){
    return Voting(root_url,_id, "notDownVote", responseHandler)
}

export {FetchQuestions, FetchVoting, UpVote, DownVote, NotUpVote, NotDownVote}
