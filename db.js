const Database = require("better-sqlite3");
const db = new Database("database.db");

/* Create games table */
db.prepare(`
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        platform TEXT,
        genre TEXT,
        status TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`).run();

/* Create users table */
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT
    )    
`).run();

/* Create default user if none exists */
const userCount = db.prepare('SELECT COUNT(*) AS total FROM users').get();

if (userCount.total === 0) {
    db.prepare(
        'INSERT INTO users (email, password) VALUES (?, ?)'
    ).run('admin', 'admin');
}

module.exports = db;