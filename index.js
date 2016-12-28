// var server = require("./server");
// var router = require("./router");

// server.start(router.route);

var resetSrc = require('./public/url/post/resetSrc');
var manageSrc = require('./public/url/post/manageSrc');
//var xlsx = require('./public/url/post/uploadxlsx');



var express = require('express');
var bodyParser = require('body-parser')

var multer  = require('multer')
var upload = multer({ dest: './public/data/' })
var type = upload.single('recfile')
var fs = require("fs")
var router = express.Router();
var app = express();

//app.set('view engine', 'jade');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'jshtml');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
router.all('/', function (req, res) {
    res.sendFile('index.html')
});
// router.get('/download.html', function(req, res) {
//     res.redirect('download.html');
// });
//xlsx 文件导入 upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
//})
app.post('/public/url/post/uploadxlsx',type, function (req, res,next) {
  console.log(req.file)
  //var temp = xlsx.xlsxFile(req.file)
  var tmp_path = req.file.path;
  var excelName = 'addrs.xlsx';
  var target_path = './public/data/' + excelName||req.file.originalname;
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
	
	src.pipe(dest); 
	fs.unlink(tmp_path);
	   src.on('end', function() { console.log('complete');});

	   src.on('error', function(err) { console.log('error'); });
 res .json({
			"RESULT":1,
			"MESSAGE":'上传成功！'
		});
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
