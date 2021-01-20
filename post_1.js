var http=require('http');
var fs = require('fs');
var url = require('url');

const hostname = '127.0.0.1';
const port = 80;

const server = http.createServer((req, res) => {
    let data = []
    req.on('data', chunk => {
        data.push(chunk)  // 将接收到的数据暂时保存起来
    })
    req.on('end', () => {
        console.log(JSON.parse(data)) // 数据传输完，打印数据的内容
    })
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});