var express = require('express');

var app = express();

app.use(express.static('./public'));

var port = process.env.port || 3000;

app.listen(port);
console.log('server running at ', port);
