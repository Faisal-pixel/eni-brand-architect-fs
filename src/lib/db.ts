import { dbData } from "@/app/types/backend/db.backend.types";
import { JSONFilePreset } from "lowdb/node";

const defaultData: dbData = {
    blogPosts: [],
}

const db = await JSONFilePreset<dbData>("db.json", defaultData);

export default db;