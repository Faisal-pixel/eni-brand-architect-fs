export type Article = {
    id: number;
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