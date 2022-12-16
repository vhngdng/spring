const table = document.querySelector(".table").getElementsByTagName("tbody")[0];
const input = document.getElementById("search");
let users = [];
// show all users
const getAllUser = function () {
	table.innerHTML = "";
	axios
		.get(`http://localhost:8079/api/v1/users/all`)
		.then((response) => {
			users = response.data;
			console.log(users);
			displayUser(users);
		})
		.catch((error) => {
			console.log(error);
		});
};
getAllUser();

//display User
const displayUser = (users) => {
	table.innerHTML = "";
	users.forEach((user) => {
		const tr = document.createElement("tr");
		tr.innerHTML = `
				<td>${user.id}</td>
				<td>${user.name}</td>
				<td>${user.email}</td>
				<td>${user.phone}</td>
				<td>${user.address}</td>
				<td>
					<a href="./detail.html?id=${user.id}" class="btn btn-success">
						Xem chi tiết
					</a>
					<button class="btn btn-danger" onclick="deleteUser(${user.id})">Xóa</button>
				</td>
		`;
		table.appendChild(tr);
	});
};
// find user
input.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		let data = input.value;
		findInfoUserByName(data);
	}
});

// list users find by name
const findInfoUserByName = function (data) {
	axios
		.get(`http://localhost:8079/api/v1/users/search?name=${data}`)
		.then((response) => {
			let user = response.data;
			console.log(user);
			displayUser(user);
		})
		.catch((error) => {
			console.log(error);
		});
};

const deleteUser = (id) => {
	axios
		.delete(`http://localhost:8079/api/v1/users/${id}`)
		.then(() => {
			users = users.filter((user) => user.id != id);
			displayUser(users);
		})
		.catch((error) => {
			console.log(error);
		});
};
