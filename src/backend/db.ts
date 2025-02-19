import Database from "better-sqlite3";

const db = new Database("database.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT DEFAULT "",
    completed BOOLEAN DEFAULT 0,
    color TEXT
  )
`);

export default db;
