import { dbData } from "@/app/types/backend/db.backend.types";
import { JSONFilePreset } from "lowdb/node";
import path from "path";

const jsonFilePath = path.join(process.cwd(), "src/db/db.json");

const defaultData: dbData = {
    blogPosts: [],
    careers: []
};

const db = await JSONFilePreset<dbData>(jsonFilePath, defaultData);

// Ensure schema exists
await db.read();
db.data ||= defaultData;

if (!db.data.blogPosts) db.data.blogPosts = [];
if (!db.data.careers) db.data.careers = [];

await db.write();

export default db;