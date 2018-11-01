type QuestionEntry = {
    question: String,
    postDate: Date,
    upVoteCookies: Array<string>,
    canUpVote: boolean,
    downVoteCookies: Array<string>,
    canDownVote: boolean,
    flagCount: Number,
}

export {QuestionEntry}
