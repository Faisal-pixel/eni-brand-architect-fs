interface MediaItem {
  id: string;
  src: string;
  type: "image" | "video";
  alt?: string;
}

interface DateSection {
  date: string;
  paragraph: string;
  images: MediaItem[];
  videos: MediaItem[];
}


export type { MediaItem, DateSection };