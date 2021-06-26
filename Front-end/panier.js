// panier.js

// teddy class
class Teddy {
	constructor(id, image, name, price) {
		this.id = id;
		this.name = name;
		this.price = price;
	}
}

// UI class : handle UI Tasks
class UI {
	static displayTeddies() {
		const teddies = Store.getTeddies();
		console.log(teddies);

		teddies.forEach((teddy) => UI.addTeddyToList(teddy));
	}
	static addTeddyToList(teddy) {
		const list = document.querySelector("#teddy-list");

		const row = document.createElement("tr");
		//console.log("name " + teddy.name);

		row.innerHTML = `<td>${teddy.id}</td>
		    <td>${teddy.image}</td>
		    <td>${teddy.name}</td>
		    <td>${teddy.price}</td>
		    <td><a href="#" class="btn btn-danger btn-sm
		     delete"><i class="far fa-trash-alt"></i></a></td>`;
		list.appendChild(row);
	}
	static deleteTeddy(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
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
		console.log(
			"teddies : " +
				teddies +
				" local " +
				localStorage.getItem("teddies") +
				"/////"
		);

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
			if (teddies.id === id) {
				teddies.splice(index, 1);
			}
		});
		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
}

// Event : Display Teddies
document.addEventListener("DOMContentLoaded", UI.displayTeddies);

// Event : Add a teddy
// // document.querySelector("#teddy-form").addEventListener("submit", (e) => {
// // 	// prevent actual submit
// // 	e.preventDefault();
// // 	// get form values
// // 	const title = document.querySelector("#title").value;
// // 	const author = document.querySelector("#author").value;
// // 	const isbn = document.querySelector("#isbn").value;

// // 	// validate
// // 	if (title === "" || author === "" || isbn === "") {
// // 		UI.showAlert("Please fill in all fields", "danger");
// // 	} else {
// // 		UI.showAlert("Teddy added", "success");
// // 		// instatiate teddy
// // 		const teddy = new Teddy(title, author, isbn);
// // 		console.log(teddy);
// // 		// add Teddy to UI
// // 		UI.addTeddyToList(teddy);
// // 		// add teddy to store
// // 		Store.addTeddy(teddy);
// // 	}
// // });

// Event : Remove a Teddy
document.getElementById("basket-list").addEventListener("click", (e) => {
	// remove teddy from UI
	UI.deleteTeddy(e.target);
	// remove teddy from store
	Store.removeTeddy(e.target.parentElement.previousElementSibling.textContent);
	console.log(e.target.parentElement.previousElementSibling.textContent);

	// show success message
	UI.showAlert("Teddy removed", "success");
});
