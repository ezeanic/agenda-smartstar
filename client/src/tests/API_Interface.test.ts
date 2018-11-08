import {QuestionMOCK_DATA, VotePassMOCK_DATA, VoteFailMOCK_DATA} from '../Mockdata'
import {FetchQuestions, FetchVoting, UpVote, DownVote, NotUpVote, NotDownVote} from '../API_Interface'
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

    it('tests FetchQuestions catch error', () => {
        fetch.mockReject(new Error('Error: List is empty.'))
        FetchQuestions(rootUrl+"/question",(theList: QuestionEntry[]) => {
            expect(theList.length).toEqual(0)
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

    it('calls downVote and returns data to me', () => {
        fetch.mockResponseOnce(JSON.stringify(VotePassMOCK_DATA))
        DownVote(rootUrl,_id,(authentication: VoteValidation) => {
            expect(authentication.err).toEqual(false)
        })
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(rootUrl+'/vote/downVote/'+_id)
    })

    it('calls notUpVote and returns data to me', () => {
        fetch.mockResponseOnce(JSON.stringify(VoteFailMOCK_DATA))
        NotUpVote(rootUrl,_id,(authentication: VoteValidation) => {
            expect(authentication.err).toEqual(true)
        })
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(rootUrl+'/vote/notUpVote/'+_id)
    })

    it('calls notDownVote and returns data to me', () => {
        fetch.mockResponseOnce(JSON.stringify(VoteFailMOCK_DATA))
        NotDownVote(rootUrl,_id,(authentication: VoteValidation) => {
            expect(authentication.err).toEqual(true)
        })
        //assert on the times called and arguments given to fetch
        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toEqual(rootUrl+'/vote/notDownVote/'+_id)
    })

    it('tests Fetchvoting catch error', () => {
        fetch.mockReject(new Error('Error: cannot validate.'))
        NotDownVote(rootUrl,_id,(authentication: VoteValidation) => {
        expect(authentication.err).toEqual(true)
        expect(authentication.msg).toEqual("Error: cannot validate.")
        })
    })
})
