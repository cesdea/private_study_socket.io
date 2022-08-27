const express=require('express');
const cors=require("cors")
const http=require('http')
const socket=require('socket.io')
// http server를 socket.io server로 upgrade한다

// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다
// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
class Server{
  constructor() {
    this.app=express();
    this.app.use('/static', express.static('index.html'));
    this.setMiddleWare();
    this.setRouter();
    this.server = http.createServer(this.app);
    this.io = socket.listen(this.server);
    // this.setErrorHandler();
    this.io.on('connection', (socket)=> {
    
      // 접속한 클라이언트의 정보가 수신되면
      socket.on('login', (data)=> {
        console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);
    
        // socket에 클라이언트 정보를 저장한다
        socket.name = data.name;
        socket.userid = data.userid;
    
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        this.io.emit('login', data.name );
      });
    
      // 클라이언트로부터의 메시지가 수신되면
      socket.on('chat', (data)=> {
        console.log('Message from %s: %s', socket.name, data.msg);
    
        var msg = {
          from: {
            name: socket.name,
            userid: socket.userid
          },
          msg: data.msg
        };
    
        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
        this.io.emit('chat', msg);
    
        // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
        // socket.emit('s2c chat', msg);
    
        // 접속된 모든 클라이언트에게 메시지를 전송한다
        // io.emit('s2c chat', msg);
    
        // 특정 클라이언트에게만 메시지를 전송한다
        // io.to(id).emit('s2c chat', data);
      });
      // force client disconnect from server
      socket.on('forceDisconnect', ()=> {
        socket.disconnect();
      })
    
      socket.on('disconnect', ()=> {
        console.log('user disconnected: ' + socket.name);
      });
    });
  }
  setMiddleWare(){
    this.app.use(cors())
  }
  setRouter() {
    this.app.get('/', function(req, res) {
      res.sendFile(__dirname + '/static/index.html');
    });
  }
  
 
}
module.exports=new Server().server