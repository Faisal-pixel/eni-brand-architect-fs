export type Article = {
    id: string;
    category: "Inspiration";
    title: string;
    description: string;
    author: string;
    authorAvatar: string;
    date: string;
    image: string;
    content: string;
};

export type Articles = Article[];