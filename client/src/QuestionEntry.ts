type QuestionEntry = {
    question: String,
    postDate: Date,
    numUpVotes: Number,
    canUpVote: Boolean;
    numDownVotes: Number,
    canDownVote: Boolean,
    flagCount: Number,
    _id: string,
}

type VoteValidation = {
    err: boolean,
    msg: string
}

export {QuestionEntry, VoteValidation}
