

const teddies = JSON.parse(localStorage.getItem("teddies"));
const contact = JSON.parse(localStorage.getItem("contact"));
let  output = `Contact : ${contact.firstName} Teddies : `;
let products =[];
//let products
for(let i=0; i<teddies.length; i++){
	output += ` ${teddies[i].id}`;
	products.push(teddies[i].id);

} 

const jsonBody =  {
	"contact": contact,
	"products": products
};


output += `</div>`;
document.getElementById("output").innerHTML = output;

// const jsonBody = {
// 	"contact": {
// 		"firstName": "hioj",
// 		"lastName": "hioj",
// 		"email": "hioj",
// 		"address": "hioj",
// 		"city": "hioj"
// 	},
// 	"products": ["5beaabe91c9d440000a57d96", "5beaabe91c9d440000a57d96"]
// };
console.log(jsonBody);
const url = "http://localhost:3000/api/teddies/order";
const options = {
	method: "POST",
	headers: {
		'Accept': 'application/json', 
		'Content-Type': 'aplication/json'
	},
	body: JSON.stringify(jsonBody)};

// fetch(url, options)
// 	.then(res => res.json())
// 	.then(data => {
// 		console.log(data);
// 		//localStorage.setItem(data.orderId);
// 	});
//------------------------------------------------------------
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
	console.log(data.orderId)
	const checkedOrder = document.querySelector("#checkedOrder");
	checkedOrder.innerText = data.orderId;

	localStorage.setItem("order",data.orderId);
});
