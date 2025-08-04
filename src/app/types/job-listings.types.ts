type Job = {
    id: number;
    title: string;
    timeAgo?: string;
    description: string;
    detailedDescription: string;
    type: string;
    link?: string; // Optional link to the google form or application page
}

type Jobs = Job[];

export type { Job, Jobs };