var app = require('express')();
const cors=require("cors")
// http server를 socket.io server로 upgrade한다
var server=require("./route")

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
});
// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다
app.use(cors())
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(8000, () => {
  console.log(8000, '/api로 진행해주세요');
});