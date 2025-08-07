import { CareerPost } from "@/app/types/create-careers-page.types";

const careersPosts: CareerPost[] = [
  {
    id: "1",
    jobTitle: "Software Engineer",
    shortJobBrief:
      "A software engineer is needed to develop and maintain software applications.",
    jobType: "Full-time",
    jobCategory: "Design",
    datePosted: "12/10/2025",
    linkToApply: "https://example.com/apply/software-engineer",
  },
  {
    id: "2",
    jobTitle: "Product Manager",
    shortJobBrief:
      "A product manager is needed to oversee product development and strategy.",
    jobType: "Part-time",
    jobCategory: "Product",
    datePosted: "12/11/2025",
    linkToApply: "https://example.com/apply/product-manager",
  },
  {
    id: "3",
    jobTitle: "Marketing Specialist",
    shortJobBrief:
      "A marketing specialist is needed to manage marketing campaigns and strategies.",
    jobType: "Contract",
    jobCategory: "Marketing",
    datePosted: "12/12/2025",
    linkToApply: "https://example.com/apply/marketing-specialist",
  },
];

export default careersPosts;
