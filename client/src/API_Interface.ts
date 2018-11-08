import {QuestionEntry} from './QuestionEntry'

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
                _id:item._id,
            })
        }
        responseHandler(theList)
    })
    .catch( (err) => {
            console.log(`err : ${err}`);
    })
}

export {FetchQuestions}
