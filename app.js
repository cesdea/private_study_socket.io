var app = require('express')();
// http server를 socket.io server로 upgrade한다
var route=require("./route")

// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(8000, () => {
  console.log(8000, '/api로 진행해주세요');
});