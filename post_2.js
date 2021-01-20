var http=require('http');
var fs = require('fs');
var url = require('url');


const hostname = '127.0.0.1';
const port = 80;

var request = require('request');

const server = http.createServer((req, res) => {
    let data = []
    req.on('data', chunk => {
        data.push(chunk)  // 将接收到的数据暂时保存起来
        
    })
    req.on('end', () => {
    	  
        console.log(JSON.parse(data)) // 数据传输完，打印数据的内容
        reply(JSON.parse(data)) 
    })
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



function reply(data){
	console.log(data.from_wxid);
	var url="http://127.0.0.1:8073/send";
	var requestData="{'Event':'Api_SendEmojiMsg', 'msg':'RjpcMC5naWY=', 'to_wxid':data.from_wxid, 'robot_wxid':data.robot_wxid}";
		
	console.log(requestData)
	request.post({url:url, form:requestData}, function(error, response, body) {
    if (!error &&  response.statusCode == 200) {
       console.log(body) // 请求成功的处理逻辑  
    }
	})
	
	/*
	request({
	    url: url,
	    method: "POST",
	    body:encodeURI(requestData)
	}, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        console.log(body) // 请求成功的处理逻辑
	    }
	}); */
			
}	



function sendmsg(data){
	
	console.log('begin post');
	
	var url="http://www.datun.com.cn/soft/sen/jqr.php";
	var requestData=data;
	/*
	request({
	    url: url,
	    method: "POST",
	    json: true,
	    headers: {
	        "content-type": "application/json",
	    },
	    body: JSON.stringify(requestData)
	}, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	        console.log(body) // 请求成功的处理逻辑
	    }
	}); */
	
	request.post({url:url, form:data}, function(error, response, body) {
    if (!error &&  response.statusCode == 200) {
       console.log(body) // 请求成功的处理逻辑  
    }
	})
	
	  
}	



