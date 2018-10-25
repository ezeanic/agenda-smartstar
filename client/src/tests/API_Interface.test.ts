import {FetchQuestions} from '../API_Interface'
import {QuestionEntry} from '../QuestionEntry'

let url = process.env.API_URL + '/question/' || '/question/'

let MOCK_DATA = [{ question: 'This is a question',
               postDate: new Date(1953, 5, 12),
               upVoteCookies: 100,
               downVoteCookies: 75,
               flagCount: 12 }]

// it('fetches contacts without crashing', () => {
//     fetch.mockResponseOnce(JSON.stringify(MOCK_DATA))
//     FetchContacts(url, (theList: ContactEntry[]) => {
//         expect(theList).toEqual(MOCK_DATA)
//     }

it('fetches questions without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify(MOCK_DATA))
    FetchQuestions(url, (theList: QuestionEntry[]) => {
        expect(theList).toEqual(MOCK_DATA)
    }
});
