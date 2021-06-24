//document.getElementById("getTeddies").addEventListener("click", getTeddies);
getTeddies();
const btn = document.querySelector(".btn-primary");
console.log(btn);
console.log(document.domain);
console.log(document.URL);
let a = document.getElementsByClassName("btn-primary");

for (let i = 0; i < a.length; i++) {
	console.log(`a ${i} ` + a[i]);
}
//document.querySelectorAll(".btn").addEventListener("click", choix);

function getTeddies() {
	fetch("http://localhost:3000/api/teddies")
		.then((res) => res.json())
		.then((data) => {
			let output = "<h2>Teddies</h2>";
			let choix = `<label for="choix-select">Couleurs:</label>
							<select name="choix" id="choix-select">
							<option value=""Choisissez</option>
			`;
			data.forEach(function (post) {
				choix = `<label for="choix-select">Couleurs:</label>
				<select name="choix" id="choix-select">
					`;
				for (let i = 0; i < post.colors.length; i++) {
					if (i === 0) {
						choix += ` <option value="${post.colors[i]}" selected>${post.colors[i]}</option>`;
					} else {
						choix += ` <option value="${post.colors[i]}">${post.colors[i]}</option>`;
					}
				}

				// test
				output += `
				<div class="col-12 col-lg-4">
                	<div class="card mb-4 mb-lg-5 border-light shadow-sm">
                    	<img src="${
												post.imageUrl
											}" alt="photo peluche" class="card-img-top">
                    	<div class="card-body">
                        	<h5 class="card-title">${post.name}</h5>
                        	<p class="card-text">Prix : ${
														post.price.toFixed(2) / 100
													} €</p>
                        	<a href="./Front-end/commande.html" class="btn btn-primary stretched-link">Commander</a>
                    	</div>
                	</div>
            	</div>
				`;
			});
			let container = document.querySelector("body .container");
			console.log(container);
			let sortie = document.querySelector(".sortie");
			container.insertBefore(output, sortie);
			console.log("sortie " + sortie);
			document.getElementById("output").innerHTML = output;
			//console.log("output : " + output);
		});
}
function choix() {
	console.log("choix");
}
