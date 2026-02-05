var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET login page */
router.get('/login', function(req, res) {
    res.render('login');
});

/* POST login */
router.post('/login', function(req, res) {
    const { email, password } = req.body;
    
    const user = db.prepare(
        'SELECT * FROM users WHERE email = ? AND password = ?'
    ).get(email, password);

    if (user) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.send('Usuario o contraseña incorrectos');
    }
});

module.exports = router;