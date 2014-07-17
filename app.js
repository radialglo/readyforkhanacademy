var express = require('express'),
    http = require('http'),
    app = express(),
    httpPort = 3000;

app.use(express.static(__dirname + '/assets', { maxAge: 86400 }));

app.set('view engine', 'jade');

app.set('views', './views');

app.get('/', function(req, res) {
    res.render('index');
});

http.createServer(app).listen(httpPort);
