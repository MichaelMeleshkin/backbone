var MongoClient = require('mongodb').MongoClient,
    config = require('../config');


function connect(callback) {
    MongoClient.connect(config.get('mongodb:url'), function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.get('mongodb:collection'));

        callback(collection, db);
    });
};

function connectSession(callback) {
    MongoClient.connect(config.get('mongodb:session:url'), function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.get('mongodb:session:collection'));

        callback(collection, db);
    });
};

function connectUsers(callback) {
    MongoClient.connect(config.get('mongodb:url'), function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.get('mongodb:users'));

        callback(collection, db);
    });
};

function connectNotification(callback) {
    MongoClient.connect(config.get('mongodb:url'), function(err, db) {
        if (err) throw err;

        var collection = db.collection(config.get('mongodb:notifications'));

        callback(collection, db);
    });
};

module.exports.connect = connect;
module.exports.connectSession = connectSession;
module.exports.connectUsers = connectUsers;
module.exports.connectNotification = connectNotification;

