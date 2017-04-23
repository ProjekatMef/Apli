window.onload = function() {
	var dugmeDodajZadatak = document.querySelector("#posalji");
	dugmeDodajZadatak.addEventListener("click", dodajZadatak);
}

function dodajZadatak() {
	var korisnicko_ime = document.querySelector("#korisnicko-ime").value;
	var zadatak = document.querySelector("#zadatak").value;

	if(!validnostPodataka(korisnicko_ime, zadatak)) {
		alert("Pogresan unos podataka!");
	}

	var zadaci = {};
	zadaci.metod = "post";
	zadaci.putanja = "posalji";
	zadaci.korisnik = korisnicko_ime;
	zadaci.zadatak = zadatak;
	alert(zadaci.korisnik+"\n"+zadaci.zadatak);
}

function validnostPodataka(korisnicko_ime, zadatak) {
	if(korisnicko_ime == "" || zadatak == "") {
		return false;
	}
	return true;
}

