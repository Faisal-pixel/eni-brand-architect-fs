type Job = {
    id: number;
    title: string;
    timeAgo: string;
    description: string;
    detailedDescription: string;
    type: string;
}

type Jobs = Job[];

export type { Job, Jobs };