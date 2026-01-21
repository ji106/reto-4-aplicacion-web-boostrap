const Database = require("better-sqlite3");
const db = new Database("database.db");

/* Create users table */
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT
    )    
`).run();

if() gameCount

/* Create games table */
db.prepare(`
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        platform TEXT,
        genre TEXT,
        status TEXT
    )
`).run();

/* Create default user if none exists */
const userCount = db.prepare(`SELECT COUNT(*) as total FROM us`);

module.exports = db;