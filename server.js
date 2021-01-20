var http=require('http');
var fs = require('fs');
var url = require('url');
//����������
http.createServer(function(request,response) {
  //�������󣬰����ļ���
  var pathname= url.parse(request.url).pathname;
  //���������ļ���
  console.log("Request for "+ pathname + "  received.");
//��ȡ��׺���ж���js����css�ļ������Ŀ¼�ṹ��ͬ���˴���Ҫ�޸�
  var firstDir = pathname && pathname.split('/')[1];
  var ContentType = {'Content-Type': 'text/html'};

  // js - application/x-javascript
  if (firstDir && firstDir === 'css') {
    ContentType = {'Content-Type': 'text/css'};
  } 
  if (firstDir && firstDir === 'js') {
    ContentType = {'Content-Type': 'application/x-javascript'}
  }

  //���ļ�ϵͳ��ȥ������ļ�����
  fs.readFile(pathname.substr(1),function(err, data) {
    if(err) {
      console.log(err);
      //HTTP ״̬�� 404 �� NOT FOUND
      //Content Type:text/plain
      response.writeHead(404, {'Content-Type': 'text/html'});
    }
    else {
      //HTTP ״̬�� 200 �� OK
      //Content Type:text/plain
      response.writeHead(200, ContentType);

      //д�����Ӧ����
      response.write(data.toString());
    }
    //������Ӧ����
    response.end();
  });
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');    