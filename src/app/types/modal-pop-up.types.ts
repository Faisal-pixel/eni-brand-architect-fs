interface MediaItem {
  id: string;
  src: string;
  type: "image" | "video";
  alt?: string;
}

interface ProjectSectionModalPopupSection {
  sectionTitle: string;
  paragraph: string;
  images: MediaItem[];
  videos: MediaItem[];
}


export type { MediaItem, ProjectSectionModalPopupSection };