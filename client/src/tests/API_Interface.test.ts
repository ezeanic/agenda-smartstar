import {FetchContacts} from '../API_Interface'
import {ContactEntry} from '../ContactEntry'

let url = process.env.API_URL + '/contact/' || '/contact/'

let MOCK_DATA = [{ firstName: 'Jim',
               lastName: 'Smith',
               email: 'foo@bar.com',
               company: 'blah',
               phone: 123456 }]

it('fetches contacts without crashing', () => {
    fetch.mockResponseOnce(JSON.stringify(MOCK_DATA))
    FetchContacts(url, (theList: ContactEntry[]) => {
        expect(theList).toEqual(MOCK_DATA)
    }
});
