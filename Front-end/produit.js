// produit.js

// get the id from the URL params
const url = window.location.href;
const urlObj = new URL(url);
const id = urlObj.searchParams.get("id");


class Teddy {
	constructor(id, image, nom, color, price, nbArticles) {
		this.id = id;
		this.image = image;
		this.nom = nom;
		this.color = color;
		this.price = price;
		this.nbArticles = nbArticles;
	}
}

// console.log("id " + id);
getTeddy();
// ---- Tasks -----
// ----------------
// Fetch the chosen teddy from the API and create the card to display
function getTeddy() {
	fetch("http://localhost:3000/api/teddies/" + id)
		.then((res) => res.json())
		.then((teddy) => {
			let h1 = document.querySelector("h1");
			h1.innerText = teddy.name;
			let imageUrl = document.getElementById("imageUrl");
			imageUrl.src = teddy.imageUrl;
			let h5 = document.querySelector("h5");
			h5.innerText = teddy.name;
			let description = document.querySelector("#description");
			description.innerText = teddy.description;
			let price = document.querySelector("#price");
			price.innerText = teddy.price.toFixed(2) / 100;

			// Create select with colors available
			let color = `<label for="choix-select">Couleurs:</label>
			<select name="choix" id="choix-select" onchange="getColor();">`;
			for (let i = 0; i < teddy.colors.length; i++) {
				if (i === 0) {
					color += ` <option value="${teddy.colors[i]}" selected>${teddy.colors[i]}</option>`;
				} else {
					color += ` <option value="${teddy.colors[i]}">${teddy.colors[i]}</option>`;
				}
			}
			let ref = document.querySelector("#ref");
			ref.innerText = `Ref :  ${teddy._id}`;

			document.getElementById("color").innerHTML = color;
			document.getElementById("nbArticles").innerHTML = nbArticles;
		})
		.catch(error => console.log("Erreur : " + error));
}
function showAlert(message, className) {
	const div = document.getElementById("message");
	div.className = `mt-3 alert alert-${className}`;
	div.innerHTML = message;
	// vanish in 3 seconds
	setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
function getColor() {
	let selectValue = document.getElementById("choix-select").value;
	console.log("couleur " + selectValue);
	return selectValue;
}
// get teddies from the local storage
function getTeddies() {
	let teddies = [];

	if (localStorage.getItem("teddies") === null) {
		teddies = [];
		// console.log("teddies : " + teddies);
	} else {
		teddies = JSON.parse(localStorage.getItem("teddies"));
	}
	return teddies;
}
// check if the teddy exists then push it in teddies and the local storage
function addTeddy(teddy) {
	// console.log(teddy.nbArticles);
	const teddies = getTeddies();
	let notfound = true;
	for (let i = 0; i < teddies.length; i++) {
		if (teddies[i].id === id && teddies[i].color === teddy.color) {
			teddies[i].nbArticles += teddy.nbArticles;
			notfound = false;
		}
	}
	if (notfound) {teddies.push(teddy);}

	localStorage.setItem("teddies", JSON.stringify(teddies));
}

// Event : Add a teddy
document.querySelector("#order").addEventListener("click", (e) => {
	// prevent actual submit
	e.preventDefault();
	// console.log(document.body);
	const id = document.querySelector("#ref").innerText.substring(6);
	const image = document.querySelector("#imageUrl").src;
	const nom = document.querySelector("h5").innerText;
	const color = getColor();
	const price = +document.querySelector("#price").innerText;
	let nbArticles = Number(document.querySelector("#nbArticles").value);

	if  (nbArticles<=0){
		nbArticles = 1;
	}
	showAlert("Produit ajouté", "success");
	// instatiate teddy
	const teddy = new Teddy(id, image, nom, color, price, nbArticles);
	
	// add teddy to store
	addTeddy(teddy);
	// continue ?
	const modal = document.querySelector("#modal");
	modal.style.display = "block";
});
	
