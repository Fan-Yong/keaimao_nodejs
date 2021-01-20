
var bai="○"
var hei="●"
var kongwei=" ";//棋盘上没有放子的位置


function initwzq(pos){
 
	let arr=['','','','','','','','',''];	
	let col="";
	for (let j=0;j<8;j++){  
			col= col+(j+1)+"    ";
		}	
	col= col+9;	
	for (let i=0;i<9;i++){   
		for (let j=0;j<8;j++){  
			arr[i]= arr[i]+pos[i+1][j+1]+"————";
		}	
		 arr[i]= arr[i]+pos[i+1][9]+"  "+(i+1);
	}	
	let row="|";
	for (let i=0;i<8;i++){
		row=row+"    |";
	}	
	let wzq=col+"\n\n"+arr.join("\n" +row+"\n");	
	console.log(wzq);
	//return wzq;
}	

function initpos(){

	var kongwei=" ";
	 
	var pos = new Array();
	
	for(var i=1;i<10;i++){         
	
	  pos[i] = new Array();
	
	  for(var j=1;j<10;j++){     
	
	      pos[i][j] = kongwei;
	
	  }
	
	}
}
	
initpos();
pos[5][5]=bai
pos[6][5]=hei

initwzq(pos)