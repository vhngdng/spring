const API_URL = "http://localhost:8090/api/v1";
const inputValue = document.querySelector(".input-todo");
const todoListEl = document.getElementById("todolist");
console.log("input: " + inputValue.value);
let todos = [];
// catch function for async
const showError = (error) => {
	if (error.response) {
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		console.log(error.request);
	} else {
		console.log(error.message);
	}
};

const getTodos = async () => {
	try {
		//Goi API
		let res = await axios.get(`${API_URL}/todos`);
		console.log(res);
		todos = res.data; // luu lai du lieu tra ve tu server

		//Hien thi tren giao dien
		renderTodos(todos);
	} catch (error) {
		console.log(error);
	}
};

getTodos();

const renderTodos = (arr) => {
	todoListEl.innerHTML = "";
	if (arr.length === 0) {
		todoListEl.innerHTML = `<li>Không có công việc nào trong danh sách</li>`;
		return;
	}

	let html = "";
	arr.forEach((t) => {
		html += `
    <li>
      <input type="checkbox" ${t.status ? "checked" : ""}>
      <span class=${t.status ? "todo-active" : ""}>${t.title}</span>
      <button onclick="updateTodo(${t.id}, event)">Update</button>
      <button onclick="deleteTodo(${t.id})">Delete</button>
    </li>
    `;
	});
	todoListEl.innerHTML = html;
};

const addTodo = () => {
	let todo = inputValue.value;
	createTodo(todo)
		.then(() => {
			getTodos();
			window.location.reload();
		})
		.catch(function (error) {
			showError(error);
			return Promise.reject(error);
		});
};

const createTodo = async (todo) => {
	return await axios.post(`${API_URL}/todos`, {
		title: todo,
	});
};

const updateTodo = async (id, event) => {
	let eve = event.target.parentNode;
	let checkBox = eve.getElementsByTagName("input")[0];
	let checked = false;
	if (checkBox.checked) {
		checked = checkBox.checked;
	}
	// input trong o add de update title
	let todo = inputValue.value;
	console.log(todo);
	if (todo !== "") {
		return await axios
			.put(`${API_URL}/todos/${id}`, {
				title: todo,
				status: checked,
			})
			.then(() => {
				let foundIndex = todos.findIndex((x) => x.id == id);
				todos[foundIndex].title = todo;
				todos[foundIndex].status = checked;
				renderTodos(todos);
				
			})
			.catch(function (error) {
				showError(error);
				return Promise.reject(error);
			});
	} else {
		return await axios
			.put(`${API_URL}/todos/${id}`, {
				title: null,
				status: checked,
			})
			.then(() => {
				let foundIndex = todos.findIndex((x) => x.id == id);
				todos[foundIndex].status = checked;
				renderTodos(todos);
			})
			.catch(function (error) {
				showError(error);
				return Promise.reject(error);
			});
	}
};

const deleteTodo = async (id) => {
	return await axios
		.delete(`${API_URL}/todos/${id}`)
		.then(() => {
			let newArr = todos.filter((todo) => todo.id != id);
			console.log(newArr);
			renderTodos(newArr);
		})
		.catch(function (error) {
			showError(error);
			return Promise.reject(error);
		});
};
