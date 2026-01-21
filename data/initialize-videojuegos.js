module.exports = (db) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS videojuegos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            plataforma TEXT NOT NULL,
            genero TEXT NOT NULL,
            estado TEXT NOT NULL
        )
    `;
    db.prepare(sql).run();
}