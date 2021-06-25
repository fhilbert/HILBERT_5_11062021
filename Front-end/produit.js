// produit.js

const url = window.location.href;

const urlObj = new URL(url);

const id = urlObj.searchParams.get("id");

console.log("id " + id);

getTeddy();

document.querySelector("#order").addEventListener("click", choix);
//console.log(document.querySelector("#order"));
// document.getElementById("getTeddies").addEventListener("click", getTeddies);

//document.querySelectorAll(".btn").addEventListener("click", choix);

function getTeddy() {
	fetch("http://localhost:3000/api/teddies/" + id)
		.then((res) => res.json())
		.then((teddy) => {
			let output = "<h2>Teddies</h2>";
			let choix = `<label for="choix-select">Couleurs:</label>
							<select name="choix" id="choix-select">
							<option value=""Choisissez</option>
			`;
			// data.forEach(function (teddy) {
			// 	choix = `<label for="choix-select">Couleurs:</label>
			// 	<select name="choix" id="choix-select">
			// 		`;
			// 	for (let i = 0; i < teddy.colors.length; i++) {
			// 		if (i === 0) {
			// 			choix += ` <option value="${teddy.colors[i]}" selected>${teddy.colors[i]}</option>`;
			// 		} else {
			// 			choix += ` <option value="${teddy.colors[i]}">${teddy.colors[i]}</option>`;
			// 		}
			// 	}

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

			output += `
			<div class="col-12 col-lg-4">
			<div class="card mb-4 mb-lg-5 border-light shadow-sm">
			<img src="${teddy.imageUrl}" alt="photo peluche" class="card-img-top">
			<div class="card-body">
			<h5 class="card-title">${teddy.name}</h5>
			<p class="card-text">Prix : ${teddy.price.toFixed(2) / 100} €</p>
			<input id="order" type="submit" value="Commander" class="btn btn-primary col-12 col-lg-4">
			</div>
			</div>
			</div>
			`;
			// });
			//document.getElementById("output").innerHTML = output;
			document.getElementById("image").innerHTML = image;
			console.log("Teddy : " + image);
			//console.log("output : " + output);
		});
}
function choix() {
	console.log("ajout");
	localStorage.setItem("peluche", id);
}
