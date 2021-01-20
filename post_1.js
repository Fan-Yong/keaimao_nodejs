var http=require('http');
var fs = require('fs');
var url = require('url');

const hostname = '127.0.0.1';
const port = 80;

const server = http.createServer((req, res) => {
    let data = []
    req.on('data', chunk => {
        data.push(chunk)  // �����յ���������ʱ��������
    })
    req.on('end', () => {
        console.log(JSON.parse(data)) // ���ݴ����꣬��ӡ���ݵ�����
    })
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});