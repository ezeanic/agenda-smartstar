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
            console.log(`err : ${err}`);
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
            console.log(`err : ${err}`);
    })
}


// function Voting(_id: string, vote: string){
//     return;
// }

// function UpVote(_id: string){
//     return Voting(_id, "upVote")
// }

// function DownVote(_id: string){
//     return Voting(_id, "downVote")
// }

// function NotUpVote(_id: string){
//     return Voting(_id, "notUpVote")
// }

// function NotDownVote(_id: string){
//     return Voting(_id, "notDownVote")
// }

export {FetchQuestions, FetchVoting}
