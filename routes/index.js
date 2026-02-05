var express = require('express');
var router = express.Router();
var db = require('../db');

const { isAuth } = require('../middleware/auth');

/* GET home page (filter). */
router.get('/', isAuth, function(req, res, next) {
  const { platform, genre, status } = req.query;

  let sql = `SELECT * FROM games WHERE user_id = ?`;
  const params = [req.session.userId];

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
  const user = db.prepare('SELECT email FROM users WHERE id = ?').get(req.session.userId);

  res.render('index', {
    title: 'Mis videojuegos', 
    games: games,
    filters: { platform, genre, status },
    user: user
  });
});

/* POST add game. */
router.post('/add-game', function (req, res, next) {
  const { title, platform, genre, status } = req.body;

  db.prepare(`
    INSERT INTO games (title, platform, genre, status, user_id)
    VALUES (?, ?, ?, ?, ?)  
  `).run(title, platform, genre, status, req.session.userId);

  res.redirect('/');
});

/* POST delete game. */
router.post('/delete-game', function (req, res, next) {
  const { id } = req.body;

  db.prepare(`
   DELETE FROM games WHERE id = ? AND user_id = ?
  `).run(id, req.session.userId);

  res.redirect('/');
});

/* POST update game status. */
router.post('/update-status', function (req, res, next) {
  const { id, status } = req.body;

  db.prepare(`
    UPDATE games SET status = ? WHERE id = ? AND user_id = ?
  `).run(status, id, req.session.userId);

  res.redirect('/');
});

module.exports = router;
