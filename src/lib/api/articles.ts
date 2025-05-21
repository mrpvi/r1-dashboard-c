import { readData, createData, deleteData, updateData } from "@/lib/api/http-service";
import { Article } from "@/types/requests/articles.type";
import { RawAxiosRequestHeaders } from "axios";

const articles = {
    getArticles: (headers?: RawAxiosRequestHeaders) => readData<{ articles: Article[], articlesCount: number }>('/api/articles', headers),
    createArticle: (article: {article: Article}, headers?: RawAxiosRequestHeaders) => createData<{article: Article}>('/api/articles', article, headers),
    deleteArticle: (slug: string, headers?: RawAxiosRequestHeaders) => deleteData<void>(`/api/articles/${slug}`, {}, headers),
    updateArticle: (slug: string, article: {article: Article}, headers?: RawAxiosRequestHeaders) => updateData<{article: Article}>(`/api/articles/${slug}`, article, headers),
};

export { articles };
