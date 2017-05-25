var http = require("http");
var fs = require("fs");

var korisnici = [];
var zadaci = [];

fs.readFile("korisnici.dat", function read(err, data) {
	if(err) {
		korisnici = [{ime : "admin", zadatak : "Sastanak"}];
	}
	else {
		korisnici = JSON.parse(data);
	}
});

fs.readFile("zadaci.dat", function read(err, data) {
	if(err) {
		zadaci = [];
	}
	else {
		zadaci = JSON.parse(data);
	}
});

var index = fs.readFileSync("index.html", "utf8");
var style = fs.readFileSync("style.css", "utf8");
var appjs = fs.readFileSync("app.js", "utf8");

function prikaziInterfejs(response) {
	response.writeHead(200, {"Content-type" : "text/html"});
	response.end(index);
}

function greskaURL(response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<h1>Stranica1 nije pronadjena..");
	response.end();
}

function zadatak(zadatak) {
	zadaci.push(zadatak);
	fs.writeFile("zadaci.dat", JSON.stringify(zadaci), function(err) {
		if(err) {
			console.log(err);
		}
	});
}

function odgovorServera(request, response) {
	switch(request.url) {
		case "/":
		case "/index.html":
			prikaziInterfejs(response);
			break;
		case "/style.css":
			response.writeHead(200, {"Content-Type": "text/css"});
			response.end(style);
			break;
		case "/app.js":
			response.writeHead(200, {"Content-Type": "text/pain"});
			response.end(appjs);
			break;
		case "/novi-zadatak":
			var zadatak = "";
			request.on("data", function(data) {
				zadatak += data;
			});
			request.on("end", function() {
				zadatak = JSON.parse(zadatak);
				response.end(zadatak(zadatak));
			});
			break;
		default:
			greskaURL(response);
			break;
	}
}

var server = http.createServer(odgovorServera);
server.listen(8080);
console.log("Server startovan na portu 8080");