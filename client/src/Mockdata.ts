let QuestionMOCK_DATA = [{ 
    question: 'This is a question',
    postDate: new Date(1953, 5, 12),
    numUpVotes: 6,
    canUpVote: false,
    numDownVotes: 8,
    canDownVote: true,
    flagCount: 12,
    _id: "0002"
    }]

let MOCK_DATA = [{ question: 'This is a question',
               postDate: new Date(1953, 5, 12),
               numUpVotes: 19,
               canUpVote: true,
               numDownVotes: 27,
               canDownVote: true,
               flagCount: 12,
                _id: "dab"
            }]
               

let VotePassMOCK_DATA = {
    err: false,
    msg: "successful"
}

let VoteFailMOCK_DATA = {
    err: true,
    msg: "not successful"
}

let upVoteMOCK_DATA = {
    root_url: "Test_Url",
}
export {QuestionMOCK_DATA, VotePassMOCK_DATA, VoteFailMOCK_DATA, upVoteMOCK_DATA, PostQuestionMOCK_DATA}