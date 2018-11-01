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

export {QuestionEntry, VoteValidation}
