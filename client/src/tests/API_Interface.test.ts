import {QuestionMOCK_DATA} from '../Mockdata'
import {FetchQuestions} from '../API_Interface'
import {QuestionEntry} from '../QuestionEntry'


let questionUrl = process.env.API_URL + '/question/' || '/question/'
let voteUrl = process.env.API_URL + '/vote/' || '/vote/'
it('fetches questions without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify(QuestionMOCK_DATA))
    FetchQuestions(questionUrl, (theList: QuestionEntry[]) => {
        expect(theList).toEqual(QuestionMOCK_DATA)
    }
});
it('test upvote', () => {
    fetch.mockResponseOnce(JSON.stringify(MOCK_DATA))
    FetchQuestions(questionUrl, (theList: QuestionEntry[]) => {
        expect(theList).toEqual(MOCK_DATA)
    }
});