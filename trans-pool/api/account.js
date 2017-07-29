var db = require('./database');
var bcrypt = require('bcrypt-nodejs');

var Account = function() {

    this.getUser = function(id, done) {
        console.log('---> Account.getUser');
        db.pool.query("SELECT * FROM users WHERE id=?", [id], function(err, res) {
            done(err, res[0]);
        });
    };

    this.authenticate = function(username, password, done) {
        console.log('---> Account.authenticate');
        db.pool.query("SELECT * FROM users WHERE username=?", [username], function(err, res) {
            if (err) {
                console.log(err);
                //return done('aghh something went wrong!');
                return done(err);
            }
            if (res.length == 0) {
                console.log('---> no match');
                //return done('Invalid *username or password');
                return done(null, false, 'Invalid *username or password');
            }
            if (!bcrypt.compareSync(password, res[0].password)) {
                console.log('---> incorrect password');
                //return done('Invalid username or *password');
                return done(null, false, 'Invalid username or *password');
            }

            return done(null, res[0]);
        });
    };

    this.register = function(username, password, done) {
        console.log('---> Account.register');
        db.pool.query("SELECT * FROM users WHERE username=?", [username], function(err, res) {
            console.log( "--> (register) exist check callback");
            if (err) {
                console.log(err);
                return done('aghh something went wrong!');
            }
            if (res.length > 0) {
                console.log( "--> (register) user exists");
                return done('Requested e-mail address already exists.');
            }

            var user = {
                username: username,
                password: bcrypt.hashSync(password, null, null),
            }

            db.pool.query("INSERT INTO users (username, password, created, modified) values (?,?,now(),now())", [user.username, user.password], 
                function(err, res) {
                    if (err) {
                        console.log(err);
                        return done('aghh something went wrong!');
                    }
                    console.log( "--> (register) insert callback");
                    user.id = res.insertId;
                    return done(null, user);

            });
        });
    };

};

module.exports = new Account();
