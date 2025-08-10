So now I am trying to connect the backend
For the creation of blogs:
I want to be able to do these things:
1. Create a blog check [done]
2. Delete a blog [done]
3. Edit a blog [done]
4. Get all blogs [done]
5. Get a single blog by id [done]
6. Filter blogs by category [done - basically hit the same route as get all blogs and pass the category as a query param]
7. Get latest blog [added a new resource for this]

For the creation of careers:
I want to be able to do these thigns:
1. Create a career
2. Delete a career.
3. Edit a career
4. Get all careers posted

{
    id: string;
    jobTitle: string;
    jobType: "Full-time" | "Part-time" | "Internship" | "Contract";
    jobCategory: "Engineering"| "Development" | "Marketing" | "Sales" | "Design" | "Product" | "Customer";
    shortJobBrief: string;
    datePosted: string;
}

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
    latestArticle: boolean; (default all latestArticle field will be false)
};
For the blog list in the create-blog-post the data structure is different, what we have is:
{
    id: "1",
    image: "/images/create-blog-sample-image.png",
    title: "The real life something of Falz",
    date: "12/10/2025",
    category: "inspiration",
    latestArticle: false
},

So we will need to transform the data from the backend to the frontend for the create-blog page
So i will create a function that transformDataToFitBlogList() in a helper function in /utils/transformDataToFitBlogList


 So editing a blog thinking:
 We want to pop out the same modal used for creating a blog right, but before it pops up, we want to fetch the information from the backend, then they can edit, once they are done, we can then send a put request to the baceknd


SO i can have a modal there, that basically receive the src, but how do i optimize the image larger