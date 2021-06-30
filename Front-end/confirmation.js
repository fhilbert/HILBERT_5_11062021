















const jsonBody = {
	"contact": {
		"firstName": "hioj",
		"lastName": "hioj",
		"email": "hioj",
		"address": "hioj",
		"city": "hioj"
	},
	"products": ["5beaabe91c9d440000a57d96", "5beaabe91c9d440000a57d96"]
};
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

	localStorage.setItem(data.orderId);
});
