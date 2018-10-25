import {FetchQuestion} from '../API_Interface'
import {QuestionEntry} from '../QuestionEntry'

let url = process.env.API_URL + '/question/' || '/question/'

let MOCK_DATA = [{ id: '21344yughesbfsdonf',
               question: 'What is the agenda'
             }]

it('fetches contacts without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify(MOCK_DATA))
    FetchQuestion(url, (theList: QuestionEntry[]) => {
        expect(theList).toEqual(MOCK_DATA)
    }
});
