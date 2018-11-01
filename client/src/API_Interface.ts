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
                upVoteCookies:item.upVoteCookies,
                canUpVote:item.canUpVote,
                downVoteCookies:item.downVoteCookies,
                canDownVote:item.canDownVote,
                flagCount:item.flagCount,
            })
        }
        responseHandler(theList)
    })
    .catch( (err) => {
            console.log(`err : ${err}`);
    })
}

export {FetchQuestions}
