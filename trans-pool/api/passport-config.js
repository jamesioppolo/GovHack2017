var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./account');


passport.serializeUser(function(user,done) {
    done(null, user.id);
});

passport.deserializeUser(function(id,done) {
    Account.getUser(id, done);
});

passport.use(new LocalStrategy( function(username, password, done){
    console.log('--> passport calling authenticate');
    return Account.authenticate(username, password, done);
}));
