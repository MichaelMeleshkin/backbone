var express = require('express'),
    http = require('http'),
    path = require('path'),
    session = require('express-session'),
    favicon = require('express-favicon'),
    config = require('./config'),
    swig = require('swig'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    MongoStore = require('connect-mongo')(session),
    routes = require('./routes');


var app = express();

app.engine('swig', swig.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'swig');

app.use(express.static(__dirname + '/public'));

app.use(favicon(__dirname + '/public/backbone.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(session({
    secret: config.get('session:secret'),
    store: new MongoStore({url: config.get('mongodb:session:url')})
}));

routes(app);

var server = http.createServer(app);
server.listen(config.get('port'), function(){
    console.log('Express server listening on port ' + config.get('port'));
});
