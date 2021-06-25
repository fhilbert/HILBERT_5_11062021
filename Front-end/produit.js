// produit.js

const url = window.location.href;

const urlObj = new URL(url);

const id = urlObj.searchParams.get("id");

console.log("id " + id);
let body = document.querySelector("body");
body.style.backgroundColor = "#f0e3ed";
getTeddy();

document.querySelector("#order").addEventListener("click", choix);

function getTeddy() {
	fetch("http://localhost:3000/api/teddies/" + id)
		.then((res) => res.json())
		.then((teddy) => {
			// 	// test

			console.log(teddy);
			let h1 = document.querySelector("h1");
			h1.innerText = teddy.name;
			let image = document.getElementById("image");
			image.src = teddy.imageUrl;
			let h5 = document.querySelector("h5");
			h5.innerText = teddy.name;
			let p = document.querySelector("p");
			p.innerText = teddy.description;
			let price = document.querySelector("#price");

			price.innerText = teddy.price.toFixed(2) / 100;
			price.innerText += " €";
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
			document.getElementById("color").innerHTML = color;
			let cardbody = document.querySelector(".card-body");
			cardbody.style.backgroundColor = "#e3a8d5";
		});
}
function choix() {
	console.log("ajout");
	localStorage.setItem("peluche", id);
}
