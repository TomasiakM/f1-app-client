import { IArticle, IArticleForm } from "@/types/services/article";

const like = (id: string) => {
    return useApiSend(`api/article/${id}/like`, { method: "POST" });
}

const add = (data: IArticleForm) => {
    return useApiSend(`api/article`, { method: "POST", body: data });
}

const update = (articleId: string, data: IArticleForm) => {
    return useApiSend(`api/article/${articleId}`, { method: "PUT", body: data });
}

const remove = (articleId: string) => {
    return useApiSend(`api/article/${articleId}`, { method: "DELETE" });
}

export default { like, add, update, remove }