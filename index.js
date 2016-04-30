var express = require('express');

var app = express();

app.use(express.static('./public'));

var port = process.env.PORT || 3333;

app.listen(port);
console.log('server running at ', port);
