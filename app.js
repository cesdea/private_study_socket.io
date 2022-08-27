// http server를 socket.io server로 upgrade한다
var server=require("./route")

// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});