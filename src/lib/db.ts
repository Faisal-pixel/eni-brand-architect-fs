import { dbData } from "@/app/types/backend/db.backend.types";
import { JSONFilePreset } from "lowdb/node";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "src/db/db.json");

const defaultData: dbData = {
    blogPosts: [],
};

const db = await JSONFilePreset<dbData>(jsonFilePath, defaultData);

export default db;