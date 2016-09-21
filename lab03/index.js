var express = require('express');
var app = express();
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(2999, function () {
  console.log('Example app listening on port 2999!');
});

