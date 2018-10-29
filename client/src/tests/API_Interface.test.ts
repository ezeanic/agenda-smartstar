import {MOCK_DATA} from '../Mockdata'
import {FetchQuestions} from '../API_Interface'
import {QuestionEntry} from '../QuestionEntry'


let url = process.env.API_URL + '/question/' || '/question/'

it('fetches questions without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify(MOCK_DATA))
    FetchQuestions(url, (theList: QuestionEntry[]) => {
        expect(theList).toEqual(MOCK_DATA)
    }
});