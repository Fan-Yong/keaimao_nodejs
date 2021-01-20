var http=require('http');
const hostname = '127.0.0.1';
const port = 80;

var bai="★"
bai="福";
var hei="▲" 
hei="喜"
var kongwei="□";//棋盘上没有放子的位置
<<<<<<< HEAD
kongwei="口";
=======
kongwei="一";
>>>>>>> 全中文解决方案：喜，福

var sp="";
var cols=15;
var rows=15;
var n_num=5;


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
	//console.log(data.msg)
	if(data.msg=="下棋"||data.msg=="开始"||data.msg=="123"){		
   pos=initpos();
   user=hei;	   
	 initwzq(pos);	 
	 reply(obj,"欢迎你参加游戏：五福连珠！（五个福或者五个红包连在一起就获得胜利）请输入：行号，列号，掀起对应的茶碗。\n\n"+initwzq(pos));
	 return;		
	}	
	
	var reg = /^[0-9]+.?[0-9]*$/;
	data.msg=data.msg.replace("，",",");
	data.msg=data.msg.replace(":",",");
	data.msg=data.msg.replace("：",",");
	data.msg=data.msg.replace(" ",",");
	data.msg=data.msg.replace("；",",");
	data.msg=data.msg.replace(";",",");
	data.msg=data.msg.replace(".",",");
	data.msg=data.msg.replace("。",",");
	var a=data.msg.split(",");
	a0=a[1];
	a1=a[0];
	isxiaqi=0
	if(reg.test(a0) && reg.test(a1)){
		if(a0>0 && a0<=rows && a1>0 && a1<=cols){
			isxiaqi=1;
		}	
	}
	if(isxiaqi==0) return; 
	
	if("undefined" == typeof pos){
    pos=initpos();
    user=hei;
	}  
	if(pos[a0][a1]==hei || pos[a0][a1]==bai){
		return;
	}	
	pos[a0][a1]=user;
	
	if(isVectory(parseInt(a0),parseInt(a1),pos)==1){
		reply(obj,initwzq(pos)+"\n比赛结束!   "+user+" 棋胜！[玫瑰][玫瑰][玫瑰]");
		pos=initpos();
    user=hei;	
	}else{
		if(user==hei) 
			user=bai; 
		else
			user=hei;  
		reply(obj,initwzq(pos)+"\n\n"+user+" 走棋！上步棋:"+a1+"列:"+a0+"行");
	}	
 
	
     
}	

//回复微信用户消息
var duiyizhe="";
function reply(obj,rmsg){ 
	console.log("reply................");
	//if(duiyizhe=="" && obj.final_from_wxid!="fanjiarun") duiyizhe=obj.final_from_wxid;
	//if(duiyizhe!="") obj.from_wxid=duiyizhe;
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
	let col="";
	 
	col1="⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖";
	col1="-1---2--3---4--5---6--7---8--9-10-11-12";
	col1="一二三四五六七八九十一二三四五";
	 
	//col2="1.2.3.4.5.6.7.8.9.10.1112131415";
	//col1="⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖";
	//col2="⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖";
	/////col1="⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁";
	//col2="⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁";
	for (let i=0;i<rows;i++){   
		for (let j=0;j<cols-1;j++){  
			arr[i]= arr[i]+pos[i+1][j+1]+sp;
		}	
		 let col_num=i+1;
		 if(col_num>9) col_num=col_num-10; 
		 arr[i]= arr[i]+pos[i+1][cols]+col_num;
		 //arr[i]= arr[i]+i;
	}	
 
	let wzq=col1+"\n"+arr.join("\n" )+"\n"+col1;	
	return wzq;
	 
}	

function initpos(){
   let pos = new Array();	 
		
	for(var i=1;i<=rows;i++){
	  pos[i] = new Array();	
	  for(var j=1;j<=cols;j++){ 	
	      pos[i][j] = kongwei;
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
	
	/*if((obj.final_from_name).indexOf("绿萝")>-1 && obj.type==100) 		return true;
	if((obj.final_from_name).indexOf("高枕")>-1 && obj.type==100) 		return true;
	if((obj.final_from_name).indexOf("家润")>-1 && obj.type==100)    	return true;
	if((obj.final_from_name).indexOf("猫先生")>-1 && obj.type==100)   return true;
	if((obj.final_from_name).indexOf("李书江")>-1 && obj.type==100)   return true;	
	if((obj.final_from_name).indexOf("永飞")>-1)   return true;		*/	
	if((obj.from_name).indexOf("wuziqi")>-1  )  return true;	
	if((obj.from_name).indexOf("8人制")>-1  )  return true;	
	if((obj.from_name).indexOf("862")>-1  )  return true;			
	return false;	
	
}