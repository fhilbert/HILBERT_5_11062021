// panier.js

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
	teddies.forEach(teddy => { total += teddy.price * teddy.nbArticles;	});

	const totalElt = document.querySelector("#total");
	totalElt.innerText = `Total : ${total} €`;
	localStorage.setItem("total", total);
}
function displayTeddies() {
	const teddies = getTeddies();
	// console.log(teddies);
	teddies.forEach((teddy) => addTeddyToList(teddy));
	// creer fonction total
	basketTotal(teddies);
}
function addTeddyToList(teddy) {
	const list = document.querySelector("#basket-list");
	const row = document.createElement("tr");
	const totalTeddy = teddy.nbArticles * teddy.price;

	row.innerHTML = `<td>${teddy.id}</td>
            <td>
              <img src=${teddy.image} alt="Card image cap" class="">
            </td>
		    <td>${teddy.nom}</td>
		    <td>${teddy.color}</td>
		    <td>${teddy.nbArticles}</td>
		    <td>${teddy.price} €</td>
		    <td class="total">${totalTeddy} €</td>
		    <td><a href="#" class="btn btn-danger btn-sm
		     "><i class="far fa-trash-alt delete"></i></a></td>`;
	list.appendChild(row);
}
{/* <td style="text-align:right">${totalTeddy} €</td> */}

function deleteTeddy(el) {
	if (el.classList.contains("delete")) {
		el.parentElement.parentElement.parentElement.remove();
	}
}
function showAlert(message, className) {
	const div = document.getElementById("message");
	div.className = `mt-3 alert alert-${className}`;
	div.innerHTML = message;
	// vanish in 4 seconds
	setTimeout(() => document.querySelector(".alert").remove(), 4000);
}
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
	teddies.forEach(teddy => { for (let i = 0; i < teddy.nbArticles; i++) {
		products.push(teddy.id);
	}
	});
	const jsonBody =  {
		"contact": contact,
		"products": products
	};
	// console.log(jsonBody);
	const url = "http://localhost:3000/api/teddies/order";
	const options = {
		method: "POST",
		headers: { 
			"Accept": "application/json", 
			"Content-Type": "application/json" 
		},
		body: JSON.stringify(jsonBody)
	};
	fetch(url, options)
	.then((res) => res.json())
	.then (data => {
		console.log(data.orderId);
		localStorage.setItem("order",data.orderId);
		//
		window.location.href="confirmation.html";

	})
	.catch(error => console.log("Erreur : " + error));
}
function contactInfo(){
	let contact = {	
		"firstName" : document.getElementById("firstName").value,
		"lastName" : document.getElementById("lastName").value,
		"email" : document.getElementById("email").value,
		"address" : document.getElementById("address").value,
		"city" : document.getElementById("city").value
	}
	// console.log(contact);
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
		// Compute total
		basketTotal(getTeddies());
		
		// show success message
		showAlert("Peluche supprimée", "success");
	});
	
// Event : Submit Contact info
document.querySelector("#purchaseBtn").addEventListener("click", (e) => {
    e.preventDefault();
	// contact validation
	if(!city.value || city.validity.typeMismatch){
		error = "Merci de renseigner votre ville";
		const city = document.getElementById("city")
		city.style.backgroundColor="#fdecec";
	};
	if(!cp.value || cp.validity.patternMismatch){
		error = "Merci de renseigner un code postal valide";
		const cp = document.getElementById("cp")
		cp.style.backgroundColor="#fdecec";
	};
	if(!address.value || address.validity.patternMismatch){
		error = "Merci de renseigner votre adresse";
		const address = document.getElementById("address")
		address.style.backgroundColor="#fdecec";
	};
	if(tel.validity.typeMismatch){
		error = "Votre numéro doit être composé exclusivement de chiffres";
		const tel = document.getElementById("tel")
		tel.style.backgroundColor="#fdecec";
	};
	if(!firstName.value || firstName.validity.patternMismatch){
		error = "Merci de renseigner votre prénom";
		const firstname = document.getElementById("firstName")
		firstname.style.backgroundColor="#fdecec";
	};
	if(!lastName.value || lastName.validity.patternMismatch){
		error = "Merci de renseigner votre Nom";
		const nom = document.getElementById("lastName")
		nom.style.backgroundColor="#fdecec";
	};
	if(!email.value || email.validity.patternMismatch){
		error = "Merci de renseigner une adresse email valide";
		const email = document.getElementById("email")
		email.style.backgroundColor="#fdecec";
	};
	// empty basket
	if(Number(localStorage.getItem("total")) === 0){
		error = "Votre panier est vide";
	};
	if (error){
		document.querySelector("#error").innerHTML= error;
		error = null;
	} else {
		contactInfo();
		checkOrder();
	};
});

displayTeddies();
