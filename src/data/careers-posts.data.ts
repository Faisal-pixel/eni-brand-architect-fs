import { CareerPost } from "@/app/types/create-careers-page.types";

const careersPosts: CareerPost[] = [
  {
    id: "1",
    jobTitle: "Software Engineer",
    shortJobBrief:
      "A software engineer is needed to develop and maintain software applications.",
    jobType: "full-time",
    category: "design",
    date: "12/10/2025",
  },
  {
    id: "2",
    jobTitle: "Product Manager",
    shortJobBrief:
      "A product manager is needed to oversee product development and strategy.",
    jobType: "part-time",
    category: "product",
    date: "12/11/2025",
  },
  {
    id: "3",
    jobTitle: "Marketing Specialist",
    shortJobBrief:
      "A marketing specialist is needed to manage marketing campaigns and strategies.",
    jobType: "contract",
    category: "marketing",
    date: "12/12/2025",
  },
];

export default careersPosts;
