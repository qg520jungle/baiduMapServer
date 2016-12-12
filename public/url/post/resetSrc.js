//用于处理 source.js 添加 point 
var fs = require("fs")
//顺序执行
// /*var data = fs.readFileSync('input.txt');
// console.log(data.toString());*/

// var data =''

// var newData = '我是新来的'
// var writerStream = fs.createWriteStream('./js/source.js');
// var xlsx = require("node-xlsx");
// var excelName = 'addrs.xlsx'
// var list = xlsx.parse('./data/'+excelName)
// //从xlsx中获得数据
function rest(data){
	//console.log(list)
	//var str = JSON.stringify(data)
	fs.writeFileSync('./public/js/source.js', 'var addrsArr='+data);
	var res =true
	return res
}
// //搜索完成，提交数据，再次写入

// getList(list)

// console.log('end!')
var restFile = function (params) {
  var res = rest(params.DATA)
	return {
			"RESULT":res?'1':'0',
			"MESSAGE":res?'地图查看器地址初始化成功！':'初始化失败！'
		};
}
exports.restFile = restFile;