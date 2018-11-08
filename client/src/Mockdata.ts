let QuestionMOCK_DATA = [{ 
    question: 'This is a question',
    postDate: new Date(1953, 5, 12),
    numUpVotes: 6,
    canUpVote: "false",
    numDownVotes: 8,
    canDownVote: "true",
    flagCount: 12,
    _id: "1234567890"
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
export {QuestionMOCK_DATA, VotePassMOCK_DATA, VoteFailMOCK_DATA,upVoteMOCK_DATA}