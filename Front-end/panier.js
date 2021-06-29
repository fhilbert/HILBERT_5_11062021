// panier.js
console.log("panier");

// teddy class
class Teddy {
	constructor(id, image, nom, price) {
		this.id = id;
		this.image = image;
		this.nom = nom;
		this.price = price;
		this.nbArticles = nbArticles;
	}
}

// UI class : handle UI Tasks
class UI {
	static displayTeddies() {
		const teddies = Store.getTeddies();
		console.log(teddies);
		teddies.forEach((teddy) => UI.addTeddyToList(teddy));
		let total = 0;
		for (let i = 0; i < teddies.length; i++) {
			total += teddies[i].price * teddies[i].nbArticles;
		}
		const Total = document.querySelector("#total");
		Total.innerText = total;
	}
	static addTeddyToList(teddy) {
		const list = document.querySelector("#basket-list");
		const row = document.createElement("tr");

		row.innerHTML = `<td>${teddy.id}</td>
            <td>
              <img src=${teddy.image} alt="Card image cap" width=60px height= 60px class="">
            </td>
		    <td>${teddy.nom}</td>
		    <td>${teddy.price}</td>
		    <td>${teddy.nbArticles}</td>
		    <td><a href="#" class="btn btn-danger btn-sm
		     "><i class="far fa-trash-alt delete"></i></a></td>`;
		list.appendChild(row);
	}
	static deleteTeddy(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.parentElement.remove();
		}
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

	static removeTeddy(id) {
		const teddies = Store.getTeddies();
		teddies.forEach((teddy, index) => {
			if (teddies[index].id === id) {
				teddies.splice(index, 1);
			}
		});
		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
}

// Event : Display Teddies
document.addEventListener("DOMContentLoaded", UI.displayTeddies);

// Event : Remove a Teddy
document.getElementById("basket-list").addEventListener("click", (e) => {
	console.log(e.target); // remove teddy from UI
	UI.deleteTeddy(e.target);

	// remove teddy from store
	Store.removeTeddy(
		e.target.parentElement.parentElement.parentElement.firstChild.textContent
	);

	// show success message
	UI.showAlert("Teddy removed", "success");
});
UI.displayTeddies();
