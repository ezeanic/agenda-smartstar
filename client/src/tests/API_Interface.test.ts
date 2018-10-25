import {FetchQuestions} from '../API_Interface'
import {FetchContacts} from '../API_Interface'
import {MOCK_DATA} from '../Mockdata'
import {QuestionEntry} from '../QuestionEntry'
import {ContactEntry} from '../ContactEntry'

let url = process.env.API_URL + '/question/' || '/question/'

let MOCK_DATAc = [{ 
    firstName: 'Jim',
    lastName: 'Smith',
    email: 'foo@bar.com',
    company: 'blah',
    phone: 123456
}]

it('fetches contacts without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify(MOCK_DATAc))
    FetchContacts(url, (theList: ContactEntry[]) => {
        expect(theList).toEqual(MOCK_DATAc)
    }

it('fetches questions without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify(MOCK_DATA))
    FetchQuestions(url, (theList: QuestionEntry[]) => {
        expect(theList).toEqual(MOCK_DATA)
    }
});
