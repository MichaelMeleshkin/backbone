var checkAuth = require('../middleware/checkAuth'),
    crypto = require('crypto'),
    config = require('../config'),
    ObjectID = require('mongodb').ObjectID,
    db = require('../mongodb');

function routes(app) {
    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.get('/', checkAuth, function (req, res) {
        res.render('index');
    });

    app.post('/login', function (req, res) {
        db.connectUsers(function (collection, db) {
            collection.findOne({name: req.body.username}, function (err, user) {
                if (err) throw err;

                var cryptoPass = crypto.createHmac('sha1', config.get('user:salt')).update(req.body.password).digest('hex');
                if (user) {
                    if (user.pass == cryptoPass) {
                        req.session.uid = user._id;

                        res.redirect('/');

                        db.close();
                    }

                } else {

                    collection.insert({name: req.body.username, pass: cryptoPass}, function (err, user) {
                        if (err) throw err;
                        req.session.uid = user._id;

                        res.redirect('/');

                        db.close();
                    });
                }
            });
        });

    });

    app.get('/collection', checkAuth, function (req, res) {

        db.connect(function (collection, db) {
            collection.find({uid: req.session.uid}).toArray(function(err, items) {
                if (err) throw err;
                items.forEach(function (item) {
                    item.id = item._id;
                    delete item._id;
                });

                res.end(JSON.stringify(items));
                db.close();
            });
        });

        //read - /collection
    });

    app.post('/collection', checkAuth, function (req, res) {
        db.connect(function (collection, db) {
            req.body.uid = req.session.uid;
            collection.insert(req.body, null, function(err, item) {
                if (err) throw err;

                db.close();
            });
        });

        //create - /collection
    });

    app.put('/collection/:id', checkAuth, function (req, res) {
        db.connect(function (collection, db) {
            collection.findOneAndUpdate({_id: ObjectID(req.body.id)}, req.body, function(err, item) {
                if (err) throw err;

                db.close();
            });
        });

        //update - /collection/id
    });

    app.delete('/collection/:id', checkAuth, function (req, res) {
        db.connect(function (collection, db) {
            collection.findOneAndDelete({_id: ObjectID(req.params.id)}).toArray(function(err, items) {
                if (err) throw err;

                db.close();
            });
        });

        //delete - /collection/id
    });
};

module.exports = routes;