type Job = {
    id: string;
    jobTitle: string;
    timeAgo?: string;
    description?: string; // removing soon
    jobCategory: "Engineering"| "Development" | "Marketing" | "Sales" | "Design" | "Product" | "Customer" | "Management";
    detailedDescription: string;
    jobType: string;
    datePosted?: string; // Optional date posted
    link?: string; // Optional link to the google form or application page
}

type Jobs = Job[];

export type { Job, Jobs };