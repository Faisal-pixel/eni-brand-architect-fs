type Job = {
    id: number;
    title: string;
    timeAgo?: string;
    description: string;
    jobCategory: "Engineering"| "Development" | "Marketing" | "Sales" | "Design" | "Product" | "Customer" | "Management";
    detailedDescription: string;
    type: string;
    link?: string; // Optional link to the google form or application page
}

type Jobs = Job[];

export type { Job, Jobs };