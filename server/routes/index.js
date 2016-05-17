var checkAuth = require('../middleware/checkAuth'),
    crypto = require('crypto'),
    config = require('../config'),
    ObjectID = require('mongodb').ObjectID,
    db = require('../mongodb');

function routes(app) {
    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.redirect('login');
    });

    app.get('/', checkAuth, function (req, res) {
        res.render('index');
    });

    app.post('/login', function (req, res) {
        db.connectUsers(function (collection, database) {
            collection.findOne({name: req.body.username}, function (err, user) {
                if (err) throw err;

                var cryptoPass = crypto.createHmac('sha1', config.get('user:salt')).update(req.body.password).digest('hex');
                if (user) {
                    if (user.pass == cryptoPass) {
                        req.session.uid = user._id;
                        req.session.uname = user.name;

                        res.redirect('/');

                        database.close();
                    }

                } else {

                    collection.insert({name: req.body.username, pass: cryptoPass}, function (err, user) {
                        if (err) throw err;
                        req.session.uid = user._id;
                        req.session.uname = user.name;

                        res.redirect('/');

                        database.close();
                    });
                }
            });
        });

    });
    
    /* COLLECTION */

    app.get('/collection', checkAuth, function (req, res) {
        db.connect(function (collection, database) {
            collection.find({$or:[{uid: req.session.uid},{share: {$elemMatch: {name: req.session.uname}}}]}).toArray(function(err, items) {
                if (err) throw err;
                items.forEach(function (item) {
                    item.id = item._id;
                    delete item._id;

                    item.currentName = req.session.uname;

                    item.sharedTask = false;
                    item.share.forEach(function (share) {
                        if (share.name === item.currentName) {
                            item.sharedTask = true;
                        }
                    });
                });

                res.end(JSON.stringify(items));
                database.close();
            });
        });

        //read - /collection
    });

    app.post('/collection', checkAuth, function (req, res) {
        db.connect(function (collection, database) {
            req.body.uid = req.session.uid;
            req.body.uname = req.session.uname;
            collection.insert(req.body, null, function(err, item) {
                if (err) throw err;

                database.close();
            });
        });

        //create - /collection
    });

    app.put('/collection/:id', checkAuth, function (req, res) {
        db.connect(function (collection, database) {
            collection.findOneAndUpdate({_id: ObjectID(req.body.id)}, req.body, function(err, item) {
                if (err) throw err;

                database.close();
            });
        });

        //update - /collection/id
    });

    app.delete('/collection/:id', checkAuth, function (req, res) {
        db.connect(function (collection, database) {
            collection.findOneAndDelete({_id: ObjectID(req.params.id)}, function(err, item) {
                if (err) throw err;

                if (item.value.share.length) {
                    item.value.share.forEach(function (share) {

                        db.connectNotification(function (collection, database) {
                            collection.insert({
                                username: share.name,
                                taskName: item.value.title,
                                isNew: false
                            }, null, function(err, item) {
                                if (err) throw err;

                                database.close();
                            });
                        });

                    });
                } else {
                    database.close();
                }
            });
        });

        //delete - /collection/id
    });
    
    /* NOTIFICATION */

    app.get('/notification', checkAuth, function (req, res) {
        db.connectNotification(function (collection, database) {
            collection.find({username: req.session.uname}).toArray(function(err, items) {
                if (err) throw err;

                res.end(JSON.stringify(items));
                database.close();
            });
        });

        //read - /collection
    });

    app.post('/notification', checkAuth, function (req, res) {
        db.connectNotification(function (collection, database) {
            collection.insert(req.body, null, function(err, item) {
                if (err) throw err;

                database.close();
            });
        });

        //create - /collection
    });

    app.put('/notification/:id', checkAuth, function (req, res) {
        db.connectNotification(function (collection, database) {
            collection.findOneAndUpdate({username: ObjectID(req.body.uname)}, req.body, function(err, item) {
                if (err) throw err;

                database.close();
            });
        });

        //update - /collection/id
    });

    app.delete('/notification', checkAuth, function (req, res) {
        db.connectNotification(function (collection, database) {
            collection.deleteMany({username: req.session.uname}, function(err, items) {
                if (err) throw err;

                database.close();
            });
        });

        //delete - /collection/id
    });
};

module.exports = routes;