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

interface ITag {
    id: string;
    slug: string;
    name: string;
}