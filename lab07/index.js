var express = require('express');

var app = express();
app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/lab7.html');
});

app.get('/username', function (req, res) {
  res.json(
    {
      "username":"lab7"
    }
  );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
