import {QuestionMOCK_DATA, VotePassMOCK_DATA, VoteFailMOCK_DATA, upVoteMOCK_DATA} from '../Mockdata'
import {FetchQuestions, FetchVoting, UpVote} from '../API_Interface'
import {QuestionEntry, VoteValidation, upVoteValidation} from '../QuestionEntry'

/* jest-fetch-mock is documented here: https://www.npmjs.com/package/jest-fetch-mock */

let questionUrl = process.env.API_URL + '/question/' || '/question/'
let voteUrl = process.env.API_URL + '/vote/' || '/vote/'
let _id = process.env.API_URL + '/_id/' || '/_id/'

describe("testing fetchers in network happy paths", ()  => {

    it('fetches questions without crashing', () => {
        fetch.mockResponseOnce(JSON.stringify(QuestionMOCK_DATA))
        FetchQuestions(questionUrl, (theList: QuestionEntry[]) => {
            expect(theList).toEqual(QuestionMOCK_DATA)
        })
    })

    it('test upVote', () => {
        fetch.mockResponseOnce(JSON.stringify(VotePassMOCK_DATA))
        FetchVoting(voteUrl, (authentication: VoteValidation) => {
            expect(authentication.err).toEqual(false)
        })
    })

    it('test downVote', () => {
        fetch.mockResponseOnce(JSON.stringify(VoteFailMOCK_DATA))
        FetchVoting(voteUrl, (authentication: VoteValidation) => {
            expect(authentication.err).toEqual(true)
        })
    })

    it('test upVote', () => {
        fetch.mockResponseOnce(JSON.stringify(upVoteMOCK_DATA))
        UpVote(voteUrl,_id,(authentication: upVoteValidation) => {
            expect(authentication.root_url).toBe("Test_Url")
        })
    })
})
