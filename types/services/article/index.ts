import { ITag } from "../tag";

export interface IArticleItem{
    id: string;
    title: string;
    slug: string;
    image: string;
    likes: string[];
    description: string;
    descriptionHtml: string;
    publishedAt: string;
}

export interface IArticle extends IArticleItem{
    tags: ITag[];
}



export interface IArticleForm {
    title: string;
    image: string;
    description: string;
    descriptionHtml: string;
    publishedAt: Date | null;
    tagIds: string[];
}