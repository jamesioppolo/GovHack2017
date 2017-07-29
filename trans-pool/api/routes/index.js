var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../account');

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/ping', function(req, res) {
    res.status(200).send("pong");
});

router.get('/login', function(req, res) {
    console.log(req.flash('failureFlash'));
    res.render('login', { message: req.flash('failureFlash') } );
});

router.post('/login', passport.authenticate('local', { successRedirect: '/ok', failureRedirect: '/login', failureFlash: true}), function(req, res) {
    res.redirect('/ok');
});

router.get('/ok', function(req, res) {
    res.status(200).send("ok");
});



router.get('/register', function(req, res) {
    res.render('register', { message: req.flash('registerMessage') });
});


router.post('/register', function(req, res) {
    console.log('--> POST register: username=' + req.body.username + ', pass=' + req.body.password);
    Account.register(req.body.username, req.body.password, function(err, account){
        if (err) {
            console.log('--> register failed, rendering register again...');
            console.log(err);
            return res.render('register', { message: 'aghhh something went wrong!' });
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/ok');
        });
    });
});

module.exports = router;
