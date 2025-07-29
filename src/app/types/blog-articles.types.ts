export type Article = {
    id: string;
    category: "Inspiration";
    title: string;
    description: string;
    author: string;
    authorAvatar: string;
    date: string;
    image: string;
    bgColor: string;
};

export type Articles = Article[];