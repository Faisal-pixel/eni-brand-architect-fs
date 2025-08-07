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

type blogPostsSupabaseResponse = {
    id?: string;
    category?: "inspiration";
    title?: string;
    description?: string;
    author?: string;
    author_avatar?: string;
    date?: string;
    image_url?: string;
    content?: string;
    latest_article?: boolean;
}

export type { blogPosts, blogPostsSupabaseResponse };