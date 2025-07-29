So now I am trying to connect the backend
For the creation of blogs:
I want to be able to do these things:
1. Create a blog
2. Delete a blog
3. Edit a blog
4. Get all blogs

For the creation of careers:
I want to be able to do these thigns:
1. Create a career
2. Delete a career.
3. Edit a career
4. Get all careers posted

Solution
For Blogs:
1. I need to figure out where to write the routes:
I will use the nextjs api folder api/
2. I need to figure out how to initiate lowdb... /lib/db.ts and it will be stored in db.json
3. I need to figure out how to structure the data and store in the database for blogs
export type Article = {
    id: number;
    category: "Inspiration";
    title: string;
    description: string;
    author: string; (default all author field will be eba)
    authorAvatar: string; (default all authorAvatar field will be eba-logo or an empty string)..
    date: string;
    image: string;
    bgColor: string;
};
For the blog list in the create-blog-post the data structure is different, what we have is:
{
    id: "1",
    image: "/images/create-blog-sample-image.png",
    title: "The real life something of Falz",
    date: "12/10/2025",
    category: "inspiration",
},

So we will need to transform the data from the backend to the frontend for the create-blog page
So i will create a function that transformDataToFitBlogList() in a helper function in /utils/transformDataToFitBlogList