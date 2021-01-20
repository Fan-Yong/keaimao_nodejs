var http=require('http');
const hostname = '127.0.0.1';
const port = 80;

//request 模块需要另外安装
var request = require('request');

const server = http.createServer((req, res) => {
    let data = []
    req.on('data', chunk => {
        data.push(chunk)  // 将接收到的数据暂时保存起来
    })
    req.on('end', () => {
    		 try{ 	  
    	  	obj=getUrlVars(decodeURIComponent(data))
    	  	console.log(decodeURIComponent(data))
    	  }catch(e){
    	  	obj={"type":99999}
    	  	 console.log('---------解析失败');
    	  }		
    	  
        
        if(isCanReply(obj)) {
        	getmsg(obj) 
        }else{
        	//console.log("不符合回复条件")
        }	
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


	

//去图灵机器人请求信息，返回后通过可爱猫回复（reply）
function getmsg(data){	
	var url="https://api.topthink.com/tuling/index";	
	console.log('图灵:'+data.msg);
	 
	request.post({url:url, form: {'question':data.msg,'appCode':'86746f51eb6464715b89cf3e5db5688e'}}, function(error, response, body) {
	//request(url, function(error, response, body) {	
    if (!error &&  response.statusCode == 200) {
         
      msg=JSON.parse(body);
      
      if(msg.message=="success")
      	reply(obj,msg.data[0].reply) 
      
      //reply(obj,msg.content);
      console.log(body)
    
    }else{
    	console.log("请求错误") 
    }	
	})
}	

//回复微信用户消息
function reply(obj,rmsg){ 
	console.log("reply................");
	var url="http://127.0.0.1:8073/send";	
	rmsg=encodeURI(rmsg);
	var requestData="{\"type\":100,\"msg\":\""+rmsg+"\",\"to_wxid\":\""+obj.from_wxid+"\",\"robot_wxid\":\""+obj.robot_wxid+"\"}";	

	request.post({url:url, form: requestData}, function(error, response, body) {
	  if (!error &&  response.statusCode == 200) {
	     console.log(body) // 请求成功的处理逻辑  
	  }
	})
}

function getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = hash[1];
    }
    return myJson;
}



function msgConvertJson(str){
	try{
		str=str.replace(/\r/g,"\",\"");	
		str=str.replace(/\n/g,"\",\"");	
		str=str.replace(/&/g,"\",\"");
		str=str.replace(/=/g,"\":\"");
		str="{\"" +str+"\"}";
		obj=JSON.parse(str);
	}catch(err){
		return {"type":99999}
	}	
	return obj;
}	 

//是否符合回复条件
function isCanReply(obj){
	if(obj.type==99999) return false;
	 
	
	
	
	if((obj.final_from_name).indexOf("绿萝")>-1 && obj.type==100) 		return true;
	if((obj.final_from_name).indexOf("家润")>-1 && obj.type==100)    	return true;
	if((obj.final_from_name).indexOf("猫先生")>-1 && obj.type==100)   return true;
	if((obj.final_from_name).indexOf("李书江")>-1 && obj.type==100)   return true;	
	if((obj.final_from_name).indexOf("永飞")>-1)   return true;			
	//if((obj.from_name).indexOf("862")>-1  )                    return true;				
	return false;	
	
}		  



