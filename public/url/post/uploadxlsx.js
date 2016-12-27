//用于上传xlsx 文件
var fs = require("fs")
function xlsx(_data){
	console.log(_data)
	var des_file = "/data/" + _data.filename;
	fs.readFile( _data.path, function (err, data) {
	    fs.writeFile(des_file, data, function (err) {
	     if( err ){
	          console.log( err );
	     }else{
	           response = {
	               message:'File uploaded successfully', 
	               filename:_data.originalname
	          };
	      }
	      console.log( response );
	      res.end( JSON.stringify( response ) );
	   });
	});
}
var xlsxFile = function (params) {
  var res = xlsx(params)
	return {
			"RESULT":res?'1':'0',
			"MESSAGE":res?'文件上传成功！':'文件上传失败！'
		};
}
exports.xlsxFile = xlsxFile;