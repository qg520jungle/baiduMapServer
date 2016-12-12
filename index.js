// var server = require("./server");
// var router = require("./router");

// server.start(router.route);

var resetSrc = require('./public/url/post/resetSrc');



var express = require('express');
var bodyParser = require('body-parser')

var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
router.all('/', function (req, res) {
    res.sendFile('index.html')
});
app.post('/public/url/post/resetSrc', function (req, res) {
  var a = resetSrc.add
  var temp = a(req.body)
  console.log(temp.data)
  
// { user: 'qg' }
  res.json(temp);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});