type QuestionEntry = {
    question: string,
    postDate: Date,
    numUpVotes: number,
    canUpVote: boolean;
    numDownVotes: number,
    canDownVote: boolean,
    flagCount: number,
    _id: string,
}

type VoteValidation = {
    err: boolean,
    msg: string
}

export {QuestionEntry, VoteValidation}
