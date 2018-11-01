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

export {QuestionEntry}
