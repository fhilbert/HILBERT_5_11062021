document.getElementById("getTeddies").addEventListener("click", getTeddies);
document.getElementById("getCamera").addEventListener("click", getCamera);
document.getElementById("getFurniture").addEventListener("click", getFurniture);

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
				output += `
					<div>
						<div>name : ${post.name}</div>
						<img src="${post.imageUrl}" width=200px height= 200px alt="photo" /></br>
						${choix}</select>
						<div>_id : ${post._id}</div>
						<div>price : ${post.price} $</div>
						<div>description : ${post.description}</div></br>
					</div>
					`;
			});
			document.getElementById("output").innerHTML = output;
		});
}
function getCamera() {
	fetch("http://localhost:3000/api/cameras")
		.then((res) => res.json())
		.then((data) => {
			let output = "<h2>Cameras</h2>";
			let choix = `<label for="choix-select">Couleurs:</label>
			<select name="choix" id="choix-select">
			<option value=""Choisissez</option>
			`;
			data.forEach(function (post) {
				choix = `<label for="choix-select">Couleurs:</label>
				<select name="choix" id="choix-select">
					`;
				for (let i = 0; i < post.lenses.length; i++) {
					if (i === 0) {
						choix += ` <option value="${post.lenses[i]}" selected>${post.lenses[i]}</option>`;
					} else {
						choix += ` <option value="${post.lenses[i]}">${post.lenses[i]}</option>`;
					}
				}
				output += `
				   <div>
						<div>name : ${post.name}</div>
						<img src="${post.imageUrl}" width=200px height= 200px alt="photo" /></br>
						${choix}</select>
						<div>_id : ${post._id}</div>
						<div>price : ${post.price}</div>
				        <div>description : ${post.description}</div></br>
				    </div>

						   `;
			});
			document.getElementById("output").innerHTML = output;
		});
}
function getFurniture() {
	fetch("http://localhost:3000/api/furniture")
		.then((res) => res.json())
		.then((data) => {
			let output = "<h2>Furniture</h2>";
			let choix = `<label for="choix-select">Couleurs:</label>
			<select name="choix" id="choix-select">
			<option value=""Choisissez</option>
			`;
			data.forEach(function (post) {
				choix = `<label for="choix-select">Couleurs:</label>
				<select name="choix" id="choix-select">
					`;
				for (let i = 0; i < post.varnish.length; i++) {
					if (i === 0) {
						choix += ` <option value="${post.varnish[i]}" selected>${post.varnish[i]}</option>`;
					} else {
						choix += ` <option value="${post.varnish[i]}">${post.varnish[i]}</option>`;
					}
				}
				output += `
					<div>
						<div>name : ${post.name}</div>
						<img src="${post.imageUrl}" width=200px height= 200px alt="photo" /></br>
							${choix}</select>
						<div>_id : ${post._id}</div>
						<div>price : ${post.price}</div>
						<div>description : ${post.description}</div></br>
					</div>
					`;
			});
			document.getElementById("output").innerHTML = output;
		});
}
