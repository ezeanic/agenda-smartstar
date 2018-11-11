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

let PostQuestionMOCK_DATA = {
    question: 'this is a new question',
    postDate: new Date(Date.now()),
    numUpVotes: 0,
    canUpVote: true,
    numDownVotes: 0,
    canDownVote: true,
    flagCount: 0,
    _id: "0001"
}

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