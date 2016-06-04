var checkAuth = require('../middleware/checkAuth'),
    crypto = require('crypto'),
    util = require('util'),
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
                        req.session.uid = user.ops[0]._id;
                        req.session.uname = user.ops[0].name;

                        res.redirect('/');

                        database.close();
                    });
                }
            });
        });

    });

    app.get('/remove', checkAuth, function (req, res) {
        db.connect(function (collection, database) {
            collection.find({uid: req.session.uid}).toArray(function(err, result) {
                if (err) throw err;

                var items = result;

                collection.deleteMany({uid: req.session.uid}, function(err, result) {
                    if (err) throw err;

                    var isAtLeastOneShared = false;
                    var arr = [];
                    items.forEach(function (item) {
                        if (item.share.length) {
                            isAtLeastOneShared = true;
                            item.share.forEach(function (share) {

                                arr.push({
                                    username: share.name,
                                    taskName: item.title,
                                    isNew: false
                                });

                            });

                        }
                    });

                    if (isAtLeastOneShared) {
                        db.connectNotification(function (collection, database) {
                            collection.insert(arr , null, function(err, items) {
                                if (err) throw err;

                                db.connectUsers(function (collection, database) {
                                    collection.findOneAndDelete({_id: ObjectID(req.session.uid)}, function (err, user) {
                                        if (err) throw err;

                                        db.connect(function (collection, database) {
                                            collection.update({}, { $pull : { 'share' : {name : req.session.uname} } }, { multi: true }, function(err, result) {
                                                if (err) throw err;

                                                db.connectNotification(function (collection, database) {
                                                    collection.deleteMany({username : req.session.uname}, function(err, result) {
                                                        if (err) throw err;

                                                        database.close();

                                                        req.session.destroy();
                                                        res.render('remove');

                                                    });
                                                });

                                            });
                                        });

                                    });
                                });
                            });
                        });
                    } else {

                        db.connectUsers(function (collection, database) {
                            collection.findOneAndDelete({_id: ObjectID(req.session.uid)}, function (err, user) {
                                if (err) throw err;

                                db.connect(function (collection, database) {
                                    collection.update({}, { $pull : { 'share' : {name : req.session.uname} } }, { multi: true }, function(err, result) {
                                        if (err) throw err;

                                        db.connectNotification(function (collection, database) {
                                            collection.deleteMany({username : req.session.uname}, function(err, result) {
                                                if (err) throw err;

                                                database.close();

                                                req.session.destroy();
                                                res.render('remove');

                                            });
                                        });

                                    });
                                });

                            });
                        });

                    }

                });
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