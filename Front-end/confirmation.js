

// fill page
const contact = JSON.parse(localStorage.getItem("contact"));
const total = localStorage.getItem("total");
const order = localStorage.getItem("order");

const h2 = document.querySelector("h2");
h2.innerText = `Bonjour ${contact.firstName} ${contact.lastName}`;
const checkedOrder = document.querySelector("#checkedOrder");
checkedOrder.innerHTML = `Votre Commande numéro : <strong>${order}</strong> d'un montant de <strong>${Number(total).toFixed(2)} €</strong>
                           est confirmée nous la préparons avec beaucoup d'attention`;

const nom = document.querySelector("#nom strong");
nom.innerText = `${contact.firstName} ${contact.lastName}`;
const address = document.querySelector("#address strong");
address.innerText = contact.address;
const city = document.querySelector("#city strong");
city.innerText = contact.city;
const email = document.querySelector("#email strong");
email.innerText = contact.email;

localStorage.clear();

