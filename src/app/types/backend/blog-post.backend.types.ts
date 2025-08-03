type blogPosts = {
    id: string;
    category: "inspiration";
    title: string;
    description: string;
    author?: string; // (default all author field will be eba)
    authorAvatar?: string; // (default all authorAvatar field will be eba-logo or an empty string)..
    date: string;
    imageUrl: string;
    content: string;
    latestArticle: boolean; // (default all latestArticle field will be false)
}

export type { blogPosts };