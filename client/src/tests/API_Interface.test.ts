import {QuestionMOCK_DATA, VotePassMOCK_DATA, VoteFailMOCK_DATA, upVoteMOCK_DATA} from '../Mockdata'
import {FetchQuestions, FetchVoting, UpVote} from '../API_Interface'
import {QuestionEntry, VoteValidation} from '../QuestionEntry'

/* jest-fetch-mock is documented here: https://www.npmjs.com/package/jest-fetch-mock */

let rootUrl = process.env.API_URL
let _id = "qwerty"

describe("testing fetchers in network happy paths", ()  => {
    
    beforeEach(() => {
        fetch.resetMocks()
      })
     
    it('fetches questions without crashing', () => {
        fetch.mockResponseOnce(JSON.stringify(QuestionMOCK_DATA))
        FetchQuestions(rootUrl+"/question", (theList: QuestionEntry[]) => {
            expect(theList).toEqual(QuestionMOCK_DATA)
        })
    })

    it('test upVote', () => {
        fetch.mockResponseOnce(JSON.stringify(VotePassMOCK_DATA))
        FetchVoting("", (authentication: VoteValidation) => {
            expect(authentication.err).toEqual(false)
        })
    })

    it('test downVote', () => {
        fetch.mockResponseOnce(JSON.stringify(VoteFailMOCK_DATA))
        FetchVoting("", (authentication: VoteValidation) => {
            expect(authentication.err).toEqual(true)
        })
    })
    
    it('calls upVote and returns data to me', () => {
        fetch.mockResponseOnce(JSON.stringify(VotePassMOCK_DATA))
        UpVote(rootUrl,_id,(authentication: VoteValidation) => {
            expect(authentication.err).toEqual(false)
        })
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(rootUrl+'/vote/upVote/'+_id)
    })
})
