import { IComment, ICommentForm, ICommentReplyForm } from "@/types/services/comment";

const getAllByArticle = (articleId: string) => {
    return useApiRead<IComment[]>(`api/comment/${articleId}`);
}

const add = (articleId: string, data: ICommentForm) => {
    return useApiSend(`api/comment/${articleId}`, {
        method: "POST",
        body: data
    });
}

const addReply = (commentId: string, data: ICommentReplyForm) => {
    return useApiSend(`api/comment/${commentId}/reply`, {
        method: "POST",
        body: data
    });
}

export default { getAllByArticle, add, addReply }