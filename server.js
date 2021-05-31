
const express = require('express');
const app = express();
const socket = require('socket.io');
// http == express
const http = require('http');//socket과 연결하기위해 http
const server = http.createServer(app);
const io = socket(server);
const nunjucks = require('nunjucks');

app.use(express.static('./node_modules/socket.io/client-dist'))
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

app.get('/',(req,res)=>{
    res.render('index')
})

io.sockets.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        console.log(`클라이언트에서 받은 메시지는 ${data.msg}`);
        socket.broadcast.emit('call',data.msg) //broadcast 나를 제외하고 보내는기능
    })
})

server.listen(3000,()=>{
    console.log('server start port 3000')
})