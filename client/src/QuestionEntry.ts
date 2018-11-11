type QuestionEntry = {
    question: String,
    postDate: Date,
    numUpVotes: number,
    canUpVote: Boolean;
    numDownVotes: number,
    canDownVote: Boolean,
    flagCount: number,
    _id: string,
}

type VoteValidation = {
    err: boolean,
    msg: string
}

export {QuestionEntry, VoteValidation}
