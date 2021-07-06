//index.js

fetch("http://localhost:3000/api/teddies")
	.then((res) => res.json())
	.then((data) => {
		let output = `<h2>Faites votre choix :</h2>
						  <div class="row">`;
		data.forEach(function (teddy) {
			output += `
					<div class="card-group col-12 col-lg-4">
					  <div class="card mb-4 mb-lg-5 border-light shadow-sm">
					    <img src="${
								teddy.imageUrl
							}" alt="Card image cap" height= 75% class="card-img-top" >
					    <div class="card-body">
					      <h5 class="card-title">${teddy.name}</h5>
					      <p class="card-text">Prix : ${teddy.price.toFixed(2) / 100} €</p>
					      <a href="\Front-end&#x5Cproduit.html?id=${
									teddy._id
								}" class="stretched-link"></a>
					    </div>
					  </div>
					</div>`;
		});
		output += `</div>`;
		document.getElementById("output").innerHTML = output;
	})
	.catch(error => console.log("Erreur : " + error));
