var http=require('http');
const hostname = '127.0.0.1';
const port = 80;

var bai="★"
bai="[福]";
var hei="▲" 
hei="[红包]"
var kongwei="□";//棋盘上没有放子的位置
kongwei="[咖啡]";

var sp="";
var cols=7;
var rows=6;
var n_num=4;


var n_col=["①","②","③","④","⑤","⑥"];
var duiyizhe="";//为机器人找到聊天对象



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
    	  	//console.log(decodeURIComponent(data))
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
	//console.log("-------------------------");
	 console.log(data.msg);
	//console.log("-------------------------");
	if((data.msg=="换人" || data.msg=="解绑") && data.final_from_wxid==data.robot_wxid){
		duiyizhe="";
		console.log("*********解绑聊天对象*********************");
		replyself(data,"解绑成功");
		return;
	}	
	 
	if(duiyizhe=="" && data.final_from_wxid!=data.robot_wxid){
		 duiyizhe=data.from_wxid;
		 console.log("***************绑定的聊天对象："+data.from_name+":"+data.from_wxid);
		 replyself(data,"绑定的聊天对象："+data.from_name+":"+data.from_wxid);
		  
	}	
	if(duiyizhe!="" && data.final_from_wxid!=data.robot_wxid && data.from_wxid!=duiyizhe){
		 console.log("*********其他对弈者，返回*************");
		 return;		
	}	
	
	 
	
	if(duiyizhe!="" && data.final_from_wxid==data.robot_wxid){
		data.from_wxid=duiyizhe;
	}	
	
	  
	if(data.msg=="下棋"||data.msg=="开始"||data.msg=="123"){		
   pos=initpos();
   user=hei;	   
	 initwzq(pos);	 
	 reply(obj,"欢迎你参加游戏：四福连珠！（玩法介绍：https://baike.baidu.com/item/%E5%9B%9B%E5%AD%90%E6%A3%8B/6357076?fr=aladdin）请输入： 列号，棋子会落入对应列的茶碗。\n\n"+initwzq(pos));
	 return;		
	}	
	
	var reg = /^[0-9]+.?[0-9]*$/;
	data.msg=data.msg.trim();	 
	a1=data.msg;	 
	isxiaqi=0
	if(reg.test(a1)){
		if(a1>0 && a1<=cols){
			isxiaqi=1;
		}	
	}
	if(isxiaqi==0) return; 
	
	if("undefined" == typeof pos){
    pos=initpos();
    user=hei;
	} 
	//判断此列情况
	a0=0;
	for(let i=0;i<=rows;i++){
		if(pos[i][a1]==kongwei) {
			a0=i;
			break;
		}	
	}	
	
	if(a0==0){
		console.log("此列已满");
		return ;
		
	}	
	
	pos[a0][a1]=user;
	
	if(isVectory(parseInt(a0),parseInt(a1),pos)==1){
		reply(obj,initwzq(pos)+"\n比赛结束!    "+user+" 胜！[呲牙][呲牙]");
		pos=initpos();
    user=hei;	
	}else{
		if(user==hei) 
			user=bai; 
		else
			user=hei;  
		//replypic(obj,"d:/node/code/1.gif"); 		
		reply(obj,initwzq(pos)+"\n上一步:"+obj.final_from_name+"("+n_col[a1-1]+"列)\n"+user+"思考中... ");
	}	
 
	
     
}	

//回复微信用户消息

function reply(obj,rmsg){ 
	console.log("reply................");
 

	var url="http://127.0.0.1:8073/send";	
	rmsg=encodeURI(rmsg);
	//obj.from_wxid="wxid_03u637srca7p12";
	var requestData="{\"type\":100,\"msg\":\""+rmsg+"\",\"to_wxid\":\""+obj.from_wxid+"\",\"robot_wxid\":\""+obj.robot_wxid+"\"}";	

	request.post({url:url, form: requestData}, function(error, response, body) {
	  if (!error &&  response.statusCode == 200) {
	     console.log(body) // 请求成功的处理逻辑  
	  }
	})
}

function replypic(obj,rmsg){ 
	console.log("reply................");
 

	var url="http://127.0.0.1:8073/send";	
	rmsg=encodeURI(rmsg);
	//obj.from_wxid="wxid_03u637srca7p12";
	var requestData="{\"type\":103,\"msg\":\""+rmsg+"\",\"to_wxid\":\""+obj.from_wxid+"\",\"robot_wxid\":\""+obj.robot_wxid+"\"}";	

	request.post({url:url, form: requestData}, function(error, response, body) {
	  if (!error &&  response.statusCode == 200) {
	     console.log(body) // 请求成功的处理逻辑  
	  }
	})
}


function replyself(obj,rmsg){ 
	console.log("reply................");

	var url="http://127.0.0.1:8073/send";	
	rmsg=encodeURI(rmsg);
	//obj.from_wxid="wxid_03u637srca7p12";
	var requestData="{\"type\":100,\"msg\":\""+rmsg+"\",\"to_wxid\":\""+obj.robot_wxid+"\",\"robot_wxid\":\""+obj.robot_wxid+"\"}";	

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


function initwzq(pos){ 
	let arr=[];	
	for (let i=0;i<rows;i++){
		arr[i]="";
	}	
	let wzq=""; 
 
	//col1="--1--2--3---4---5---6--7";
	
	//col2="1--2-3--4-5--6-7";
	
	col1=" ① ② ③ ④ ⑤ ⑥ ⑦";
	col2=" ① ② ③ ④ ⑤ ⑥ ⑦";
	
	
	
	for (let  i= rows-1;i>=0;i--){   
		for (let j=0;j<cols;j++){			
			arr[i]= arr[i]+pos[i+1][j+1];
		}	
		wzq=wzq+ arr[i]+" "+n_col[i]+"\n";
	}	 
	wzq=col1+"\n"+wzq+col2+"\n";  
	return wzq;
	 
}	
function initpos(){
  let pos = new Array();	
		
	for(let i=0;i<=rows;i++){
	  pos[i] = new Array();	
	  for(let j=1;j<=cols;j++){
	  		if(i==0){ 
	  			 pos[i][j]=hei;
	  		}	 
	  		else{	 	
	      	pos[i][j] = kongwei;
	      }	
	  }	
	}
	return pos;
}

//把下的棋子坐标传入，返回值表示结果
function  isVectory( row, col,chess){
	
	  
	 num=n_num;	 
	 yanse=chess[row][col];	 
	 //行判断
	 count=1;	 
	 n=1;
	 while(n<=num-1 && col-n>0){
	 	 if(chess[row][col-n]==yanse){
	 	 		count=count+1;
	 	 		if(count==num) return 1;
	 	 }else{
	 	 		break;
	 	 }	
	 	 n++;
	 }	
	 
	 n=1;
	 while(n<=num-1 && col+n<=cols){
	 	 if(chess[row][col+n]==yanse){
	 	 		count=count+1;
	 	 		if(count==num) return 1;
	 	 }else{
	 	 		break;
	 	 }	
	 	 n++;
	 }	
	 //-------------------------------------------------------
	 count=1;	 
	 n=1;
	 while(n<=num-1 && row-n>0){
	 	 if(chess[row-n][col]==yanse){
	 	 		count=count+1;
	 	 		if(count==num) return 1;
	 	 }else{
	 	 		break;
	 	 }	
	 	 n++;
	 }	
	 
	 n=1;
	 while(n<=num-1 && row+n<=rows){
	 	 if(chess[row+n][col]==yanse){
	 	 		count=count+1;
	 	 		if(count==num) return 1;
	 	 }else{
	 	 		break;
	 	 }	
	 	 n++;
	 }	
	 
	 
	 //-------------------------------------------------------
	 count=1;	 
	 n=1;
	 while(n<=num-1 && row-n>0 && col-n>0){
	 	 if(chess[row-n][col-n]==yanse){
	 	 		count=count+1;
	 	 		if(count==num) return 1;
	 	 }else{
	 	 		break;
	 	 }	
	 	 n++;
	 }	
	 
	 n=1;
	 while(n<=num-1 && row+n<=rows && col+n<=cols){
	 	 if(chess[row+n][col+n]==yanse){
	 	 		count=count+1;
	 	 		if(count==num) return 1;
	 	 }else{
	 	 		break;
	 	 }	
	 	 n++;
	 }
	 
	 
	 //-------------------------------------------------------
	 count=1;	 
	 n=1;
	 while(n<=num-1 && row-n>0 && col+n<=cols){
	 	 if(chess[row-n][col+n]==yanse){
	 	 		count=count+1;
	 	 		if(count==num) return 1;
	 	 }else{
	 	 		break;
	 	 }	
	 	 n++;
	 }	
	 
	 n=1;
	 while(n<=num-1 && row+n<=rows && col-n>0){
	 	 if(chess[row+n][col-n]==yanse){
	 	 		count=count+1;
	 	 		if(count==num) return 1;
	 	 }else{
	 	 		break;
	 	 }	
	 	 n++;
	 }
	 
	
	return 0;
}

//是否符合回复条件
function isCanReply(obj){
	//console.log(obj.final_from_name+"----------------")
	if(obj.type==99999) return false;
	if((obj.final_from_name).indexOf("林业子")>-1 && obj.type==100) 		return true;	
	if((obj.final_from_name).indexOf("绿萝")>-1 && obj.type==100) 		return true;	
	if((obj.final_from_name).indexOf("家润")>-1 && obj.type==100)    	return true;
	if((obj.final_from_name).indexOf("帆船")>-1 && obj.type==100)    	return true;
	//if((obj.final_from_name).indexOf("猫先生")>-1 && obj.type==100)   return true;
	if((obj.final_from_name).indexOf("查")>-1 && obj.type==100)   return true;	
	//if((obj.final_from_name).indexOf("永飞")>-1)   return true;		 
	if((obj.from_name).indexOf("wuziqi")>-1  )  return true;	
	if((obj.from_name).indexOf("8人制")>-1  )  return true;	
	//if((obj.from_name).indexOf("862")>-1  )  return true;	
	if((obj.final_from_name).indexOf("高枕")>-1) 		return true; 
	return false;	
	
}