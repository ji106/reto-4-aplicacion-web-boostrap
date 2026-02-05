var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'login', error: null});
});

/* POST login */
router.post('/login', function(req, res, next) {
  const { email, password } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);

  if (user) {
    req.session.userId = user.id;
    res.redirect('/');
  } else {
    res.render('login', { title: 'login', error: 'Usuario o contraseña incorrecta' });
  }
});

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.session.destroy(err => {
    res.redirect('/users/login');
  });
});

module.exports = router;
