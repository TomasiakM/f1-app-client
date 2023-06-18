export interface IComment {
    id: string;
    text: string;
    createdAt: string;
    createdBy: {
        id: string;
        username: string;
        image: string;
    }
    replies: IReply[];
}

export interface IReply {
    id: string;
    text: string;
    createdAt: string;
    createdBy: {
        id: string;
        username: string;
        image: string;
    }
}

export interface ICommentForm{
    text: string;
}

export interface ICommentReplyForm{
    text: string;
}