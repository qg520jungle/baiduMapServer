//用于处理 xlsx 数据
var fs = require("fs")
//顺序执行
/*var data = fs.readFileSync('input.txt');
console.log(data.toString());*/
var xlsx = require("node-xlsx");
var excelName = 'addrs.xlsx'
var list = xlsx.parse('./public/data/'+excelName)
//从xlsx中获得数据
function getList(list){
	var addrs = list[0].data
	var addrsArr = []
	for(var i=1;i<addrs.length;i++){
		console.log(addrs[i])
		var obj = {}
		obj.no=addrs[i][0];
		obj.show=addrs[i][1];
		obj.search=addrs[i][2];
		obj.point=[];
		addrsArr.push(obj)
	}
	var str = JSON.stringify(addrsArr)
	return str
}
function writeSource(str) {
	//var writeThis = fs.createWriteStream('./public/js/source.js')
	var res = fs.writeFileSync('./public/js/source.js', 'var addrsArr='+str);
	res =true
	return res
	//writeThis.write('var addrsArr='+str,'UTF8');
	// 使用 utf8 编码写入数据


	// 标记文件末尾
	//writeThis.end();



	//return writeThis
	// body...
}
//搜索完成，提交数据，再次写入
 
 

var manageSrc = function(){
	var str = getList(list)
	var res = writeSource(str)
	return {
			"RESULT":res?'1':'0',
			"MESSAGE":res?'数据写入成功！':'数据写入失败！'
		}
}
	

exports.gotFile = manageSrc
