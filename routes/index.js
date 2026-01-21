var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page (filter). */
router.get('/', function(req, res, next) {
  const { platform, genre, status } = req.query;

  let sql = `SELECT * FROM games WHERE 1=1`;
  const params = [];

  if (platform) {
    sql += ' AND platform = ?';
    params.push(platform);
  }

  if (genre) {
    sql += ' AND genre = ?';
    params.push(genre);
  }

  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }

  const games = db.prepare(sql).all(...params);
  
  res.render('index', { title: 'Mis videojuegos', games: games, selectedStatus: status });
});

/* POST add game. */
router.post('/add-game', function (req, res, next) {
  const { title, platform, genre, status } = req.body;

  db.prepare(`
    INSERT INTO games (title, platform, genre, status)
    VALUES (?, ?, ?, ?)  
  `).run(title, platform, genre, status);

  res.redirect('/');
});

/* POST delete game. */
router.post('/delete-game', function (req, res, next) {
  const { id } = req.body;

  db.prepare(`
   DELETE FROM games WHERE id = ?  
  `).run(id);

  res.redirect('/');
});

/* POST update game status. */
router.post('/update-status', function (req, res, next) {
  const { id, status } = req.body;

  db.prepare(`
    UPDATE games SET status = ? WHERE id = ?
  `).run(status, id);

  res.redirect('/');
});

module.exports = router;
