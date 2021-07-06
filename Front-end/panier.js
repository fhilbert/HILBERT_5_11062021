// panier.js
console.log("panier");

// teddy class
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
let error = null;
// Functions
function basketTotal(teddies) {
	let total = 0;
	for (let i = 0; i < teddies.length; i++) {
		total += teddies[i].price * teddies[i].nbArticles;
	}
	const totalElt = document.querySelector("#total");
	totalElt.innerText = total;
}

function displayTeddies() {
	const teddies = getTeddies();
	console.log(teddies);
	teddies.forEach((teddy) => addTeddyToList(teddy));
	// creer fonction total
	basketTotal(teddies);
}
function addTeddyToList(teddy) {
	const list = document.querySelector("#basket-list");
	const row = document.createElement("tr");

	row.innerHTML = `<td>${teddy.id}</td>
            <td>
              <img src=${teddy.image} alt="Card image cap" width=60px height= 60px class="">
            </td>
		    <td>${teddy.nom}</td>
		    <td>${teddy.color}</td>
		    <td>${teddy.nbArticles}</td>
		    <td>${teddy.price}</td>
		    <td><a href="#" class="btn btn-danger btn-sm
		     "><i class="far fa-trash-alt delete"></i></a></td>`;
	list.appendChild(row);
}
function deleteTeddy(el) {
	if (el.classList.contains("delete")) {
		el.parentElement.parentElement.parentElement.remove();
	}
}
function showAlert(message, className) {
	const div = document.createElement("div");
	div.className = `alert alert-${className}`;
	div.appendChild(document.createTextNode(message));
	const container = document.querySelector(".container");
	const form = document.getElementById("teddy-form");
	container.insertBefore(div, form);
	// vanish in 3 seconds
	setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Handles Local storage

function getTeddies() {
	let teddies = [];
	if (localStorage.getItem("teddies") === null) {
		teddies = [];
		console.log("teddies : " + teddies);
	} else {
		teddies = JSON.parse(localStorage.getItem("teddies"));
	}
	return teddies;
}

function addTeddy(teddy) {
	const teddies = getTeddies();
	teddies.push(teddy);
	localStorage.setItem("teddies", JSON.stringify(teddies));
}

function removeTeddy(id) {
	const teddies = getTeddies();
	teddies.forEach((teddy, index) => {
		if (teddies[index].id === id) {
			teddies.splice(index, 1);
		}
	});
	localStorage.setItem("teddies", JSON.stringify(teddies));
}
function checkOrder(){
	const teddies = JSON.parse(localStorage.getItem("teddies"));
	const contact = JSON.parse(localStorage.getItem("contact"));

	let products =[];
	for(let i=0; i<teddies.length; i++){
		products.push(teddies[i].id);
	} 
	// 
	const jsonBody =  {
		"contact": contact,
		"products": products
	};
	console.log(jsonBody);
	const url = "http://localhost:3000/api/teddies/order";
	fetch(url, {
		method: "POST",
		headers: { 
			'Accept': 'application/json', 
			'Content-Type': 'application/json' 
		},
		body: JSON.stringify(jsonBody)
	})
	.then((res) => res.json())
	.then (data => {
		console.log(data.orderId);
		localStorage.setItem("order",data.orderId);
	})
	.catch(error => console.log("Erreur : " + error));
}
function writeTotal(){
	const total = document.getElementById("total").innerText;
	localStorage.setItem("total", total);
}
function contactInfo(){
	let contact = {	
		"firstName" : document.getElementById("firstName").value,
		"lastName" : document.getElementById("lastName").value,
		"email" : document.getElementById("email").value,
		"address" : document.getElementById("address").value,
		"city" : document.getElementById("city").value
		
	}
	console.log(contact);
	localStorage.setItem("contact", JSON.stringify(contact));	
}

// Event : Display Teddies
document.addEventListener("DOMContentLoaded", displayTeddies);

// Event : Remove a Teddy
document.getElementById("basket-list").addEventListener("click", (e) => {
	// remove teddy
	deleteTeddy(e.target);
	// remove teddy from store
	removeTeddy(
		e.target.parentElement.parentElement.parentElement.firstChild.textContent
		);
		//calcul total
		basketTotal(getTeddies());
		
		// show success message
		showAlert("Teddy removed", "success");
	});
	
// Event : Submit Contact info
document.querySelector("#purchaseBtn").addEventListener("click", (e) => {
    e.preventDefault();
	console.log("Valider Contact");
	// validation info contact
	// dataUser validation
	if(!city.value || city.validity.typeMismatch){
		error = "Merci de renseigner votre ville";
	};
	if(!cp.value || cp.validity.patternMismatch){
		error = "Merci de renseigner un code postal valide";
	};
	if(!address.value || address.validity.patternMismatch){
		error = "Merci de renseigner votre adresse";
	};
	if(tel.validity.typeMismatch){
		error = "Votre numéro doit être composé exclusivement de chiffres";
	};
	if(!firstName.value || firstName.validity.patternMismatch){
		error = "Merci de renseigner votre prénom";
		};
	if(!lastName.value || lastName.validity.patternMismatch){
		error = "Merci de renseigner votre Nom";
		};
	if(!email.value || email.validity.patternMismatch){
		error = "Merci de renseigner une adresse email valide";
		};
	if (error){
		document.querySelector("#error").innerHTML= error;
		error = null;
	} else {
		writeTotal();
		contactInfo();
		checkOrder();
		window.location.href="confirmation.html";
	};
	// ----------------------

});


displayTeddies();
