var http = require("http");
var server = http.createServer(function(request, response) {
	response.writeHead(200, {"Content-type":"text/html"});
	response.write("<h1>Ja sam naslov.</h1>");
	response.end();
});

server.listen(8000);

console.log("Cekam na portu 8000....")