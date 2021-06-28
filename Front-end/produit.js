// produit.js

const url = window.location.href;

const urlObj = new URL(url);

const id = urlObj.searchParams.get("id");

class Teddy {
	constructor(id, image, nom, price, nbArticles) {
		this.id = id;
		this.image = image;
		this.nom = nom;
		this.price = price;
		this.nbArticles = nbArticles;
	}
}

console.log("id " + id);
let body = document.querySelector("body");
body.style.backgroundColor = "#f0e3ed";
getTeddy();

//  document.querySelector("#order").addEventListener("click", choix);

function getTeddy() {
	fetch("http://localhost:3000/api/teddies/" + id)
		.then((res) => res.json())
		.then((teddy) => {
			// 	// test

			console.log(teddy);

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
			//price.innerText += " €";

			let color = `<label for="choix-select">Couleurs:</label>
			<select name="choix" id="choix-select">
			`;
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

			let cardbody = document.querySelector(".card-body");
			cardbody.style.backgroundColor = "#e3a8d5";
			console.log("getTeddy " + teddy);
		});
}

// teddy class

// UI class : handle UI Tasks
class UI {
	static displayTeddies() {
		const teddies = Store.getTeddies();
		console.log(teddies);
	}
	static showAlert(message, className) {
		const div = document.createElement("div");
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector(".container");
		const form = document.getElementById("teddy-form");
		container.insertBefore(div, form);
		// vanish in 3 seconds
		setTimeout(() => document.querySelector(".alert").remove(), 3000);
	}
}

// Store class : Handles storage

class Store {
	static getTeddies() {
		let teddies = [];

		if (localStorage.getItem("teddies") === null) {
			teddies = [];
			console.log("teddies : " + teddies);
		} else {
			teddies = JSON.parse(localStorage.getItem("teddies"));
		}
		return teddies;
	}
	static addTeddy(teddy) {
		const teddies = Store.getTeddies();
		teddies.push(teddy);
		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
}

// Event : Add a teddy
document.querySelector("#order").addEventListener("click", (e) => {
	// prevent actual submit
	e.preventDefault();
	console.log(document.body);
	console.log(document.querySelector("h5"));
	const id = document.querySelector("#ref").innerText.substring(6);
	//id = id.substring(6);
	const image = document.querySelector("#imageUrl").src;
	const nom = document.querySelector("h5").innerText;
	const price = Number(document.querySelector("#price").innerText);
	const nbArticles = Number(document.querySelector("#nbArticles").value);

	// validate
	UI.showAlert("Teddy added", "success");
	// instatiate teddy
	const teddy = new Teddy(id, image, nom, price, nbArticles);
	console.log(teddy);
	// add teddy to store
	Store.addTeddy(teddy);
	// on continue ?
	const modal = document.querySelector("#modal");
	modal.style.display = "block";
});
