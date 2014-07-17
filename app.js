var express = require('express'),
    http = require('http'),
    app = express(),
    httpPort = 3000;

app.use(express.static(__dirname + '/public', { maxAge: 86400 }));

http.createServer(app).listen(httpPort);
