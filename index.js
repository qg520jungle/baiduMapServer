// var server = require("./server");
// var router = require("./router");

// server.start(router.route);

var resetSrc = require('./public/url/post/resetSrc');
var manageSrc = require('./public/url/post/manageSrc');
var xlsx = require('./public/url/post/uploadxlsx');



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
//xlsx 文件导入 
app.post('/public/url/post/uploadxlsx', function (req, res) {
  console.log(req.files)
  var temp = xlsx.xlsxFile(req.files)
  res.json(temp);
});

// 文件一次处理
app.post('/public/url/post/resetSrc', function (req, res) {
  
  var temp = resetSrc.restFile(req.body)
  res.json(temp);
});


//
//导入文件后执行
app.post('/public/url/post/manageSrc', function (req, res) {
  var temp = manageSrc.gotFile()
  console.log(temp)
  res.json(temp);
});

//下载文件
app.get('/public/url/post/downSrc', function (req, res) {
  res.download('public/js/source.js','source.js', function(err){
  if (err) {
    // Handle error, but keep in mind the response may be partially-sent
    // so check res.headersSent
    console.log(err)
  } else {
    // decrement a download credit, etc.
    console.log('download success')
  }
});
  return {
      "RESULT":1,
      "MESSAGE":'地图查看器地址下载成功！'
    };
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
