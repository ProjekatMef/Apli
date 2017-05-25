window.onload = function() {
	var dugmeDodajZadatak = document.querySelector("#posalji");
	dugmeDodajZadatak.addEventListener("click", dodajZadatak);
}

function AjaxZahtev(zadaciZaSlanje, callback) {
	var req = new XMLHttpRequest();
	req.open(zadaciZaSlanje.metod, zadaciZaSlanje.putanja, true);
	req.addEventListener("load", function() {
		if (req.status < 400) {
			callback(req.responseText);
		}
		else {
			callback(new Error("Request failed: " + req.statusText));
		}
	});
	req.addEventListener("error", function() {
		callback(new Error("Network error"));
	});
	req.send(zadaciZaSlanje.zadatak || null);
}

function dodajZadatak() {
	var korisnicko_ime = document.querySelector("#korisnicko-ime").value;
	var zadatak = document.querySelector("#zadatak").value;

	if(!validnostPodataka(korisnicko_ime)) {
		alert("Pogresan unos podataka!");
	}

	var zadaciZaSlanje = {};
	zadaciZaSlanje.metod = "post";
	zadaciZaSlanje.putanja = "novi-zadatak";
	var korisnik = {
		"ime" : korisnicko_ime,
		"zadatak" : zadatak
	};
	zadaciZaSlanje.zadatak = JSON.stringify(korisnik);
	AjaxZahtev(zadaciZaSlanje, odgovorServeraP);
}

function odgovorServeraP(odgovor) {
	console.log(odgovor);
}

function validnostPodataka(korisnicko_ime) {
	if(korisnicko_ime == "") {
		return false;
	}
	return true;
}

