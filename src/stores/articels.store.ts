import { Article } from "@/types/requests/articles.type";
import { create } from "zustand";

type ArticlesState = {
    allArticles: Article[];
    setAllArticles: (articles: Article[]) => void;
}
export const useArticlesStore = create<ArticlesState>((set) => ({
    allArticles: [],
    setAllArticles: (articles: Article[]) => {
        set(() => ({
            allArticles: articles
        }))
    },
}))