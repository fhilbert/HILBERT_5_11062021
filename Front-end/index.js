//document.getElementById("getTeddies").addEventListener("click", getTeddies);
let body = document.querySelector("body");
body.style.backgroundColor = "#f0e3ed";
getTeddies();

//document.querySelectorAll(".btn").addEventListener("click", choix);

function getTeddies() {
	fetch("http://localhost:3000/api/teddies")
		.then((res) => res.json())
		.then((data) => {
			let output = `<h2>Faites votre choix :</h2>
		<div class="row">`;
			let choix = `<label for="choix-select">Couleurs:</label>
		<select name="choix" id="choix-select">
		<option value=""Choisissez</option>
		`;
			data.forEach(function (teddy) {
				choix = `<label for="choix-select">Couleurs:</label>
			<select name="choix" id="choix-select">
			`;
				for (let i = 0; i < teddy.colors.length; i++) {
					if (i === 0) {
						choix += ` <option value="${teddy.colors[i]}" selected>${teddy.colors[i]}</option>`;
					} else {
						choix += ` <option value="${teddy.colors[i]}">${teddy.colors[i]}</option>`;
					}
				}

				// test
				output += `
			<div class="card-group col-12 col-lg-4">
			<div class="card mb-4 mb-lg-5 border-light shadow-sm">
			<img src="${teddy.imageUrl}" alt="Card image cap" class="card-img-top" >
			<div class="card-body">
			<h5 class="card-title">${teddy.name}</h5>
			<p class="card-text">Prix : ${teddy.price.toFixed(2) / 100} €</p>
			<a href="produit.html?id=${teddy._id}" class="stretched-link"></a>
			</div>
			</div>
			</div>
			`;
			});
			output += `</div>`;
			document.getElementById("output").innerHTML = output;
			let cardbody = document.querySelectorAll(".card-body");
			for (var i = 0; i < cardbody.length; i++) {
				cardbody[i].style.backgroundColor = "#e3a8d5";
			}
		});
}
function choix() {
	console.log("choix");
}
