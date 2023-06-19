import { IArticleItem, IArticle, IArticleForm } from "@/types/services/article";
import { IPaginatedResponse } from "@/types/commonApiResponses";

const getPaginated = (page: number, pageSize: number) => {
    const query = `?page=${page}&pageSize=${pageSize}`
    return useApiRead<IPaginatedResponse<IArticleItem>>(`api/article${query}`);
}

const getAllPaginated = (page: number, pageSize: number) => {
    const query = `?page=${page}&pageSize=${pageSize}`
    return useApiRead<IPaginatedResponse<IArticleItem>>(`api/article/all${query}`);
}

const getBySlug = (slug: string) => {
    return useApiRead<IArticle>(`api/article/${slug}`);
}

const like = (id: string) => {
    return useApiSend<IArticle>(`api/article/${id}/like`, { method: "POST" });
}

const add = (data: IArticleForm) => {
    return useApiSend(`api/article`, { method: "POST", body: data });
}
export default { getPaginated, getAllPaginated, getBySlug, like, add }