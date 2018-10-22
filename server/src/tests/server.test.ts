import fetch from 'node-fetch'

let host=process.env.API_HOST

let MOCK_DATA = {firstName: 'Jim',
               lastName: 'Smith',
               email: 'foo@bar.com',
               company: 'blah',
               phone: 123456}

describe('The server', () => {
    it('fetches without crashing', () => {
        fetch(`http://${host}:3001/contact`)
        .then(res => res.json())
        .then(json => {
            console.log("We got:" + JSON.stringify(json) + " from get")
            expect(json).toBeDefined()
        })
        .catch(err => console.log("Error!:", err))
    })
    
    it('can post some data', () => {
        fetch(`http://${host}:3001/contact`, 
            {method:'POST', body:JSON.stringify(MOCK_DATA)})
        .then(res => res.json())
        .then(json => {
            console.log("We got:" + JSON.stringify(json) + " from post")
            expect(json).toBeDefined()
        })
        .catch(err => console.log("Error!:", err))
    })
})

