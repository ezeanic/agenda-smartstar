type QuestionEntry = {
    question: String,
    postDate: Date,
    numUpVotes: Array<string>,
    canUpVote: Boolean;
    numDownVotes: Array<string>,
    canDownVote: Boolean,
    flagCount: Number,
    _id: string,
}

type VoteValidation = {
    err: boolean,
    msg: string
}

type upVoteValidation = {
    root_url: string
    _id: string,
}

export {QuestionEntry, VoteValidation, upVoteValidation}
