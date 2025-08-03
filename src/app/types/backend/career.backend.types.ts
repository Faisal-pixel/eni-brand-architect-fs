type career = {
    id: string;
    jobTitle: string;
    jobType: "Full-time" | "Part-time" | "Internship" | "Contract";
    jobCategory: "Engineering"| "Development" | "Marketing" | "Sales" | "Design" | "Product" | "Customer" | "Management";
    shortJobBrief: string;
    datePosted: string;
    linkToApply: string;
}

export type { career };