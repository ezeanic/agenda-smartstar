import fetch from 'node-fetch'

let url=process.env.API_URL

let MOCK_DATA: any[] = [];

MOCK_DATA[0] = {
               question: 'How is our budget?'
                               }

MOCK_DATA[1] = {
    question: 'HOW IS THIS QUESTION??'
                    }

describe('The server', () => {

    it('fetches without crashing', () => {
        fetch(url + "/question")
        .then(res => res.json())
        .then(json => {
            console.log("We got:" + JSON.stringify(json) + " from get")
            expect(json).toBeDefined()
        })
        .catch(err => console.log("Error!:", err))
    })
    
    it('can post some data', () => {
        fetch(url + "/question",
            {
                method:'POST', body:JSON.stringify(MOCK_DATA[1]), headers: { 'Content-Type': 'application/json' }})
        .then(res => res.json())
        .then(json => {
            console.log("We got:" + JSON.stringify(json) + " from post")
            expect(json).toBeDefined()
        })
        .catch(err => console.log("Error!:", err))
    })
    
    it('response status gives a 401 error', () => {
        fetch(url + "/check")
        // .then(res => res.status)
        .then(res => {
            expect(res.status).toEqual(401)
            console.log("Right we got a error 0f 404 status!!!!!!!!!!!!!!!!")
        })
        .catch(err => console.log("Did not give 404 error"))
    })
})

