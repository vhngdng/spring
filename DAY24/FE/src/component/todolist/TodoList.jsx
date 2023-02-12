import axios from "axios";
import React, { useState, useLayoutEffect } from "react";

const API_URL = "http://localhost:8090/api/v1/todos";
function TodoList() {
	const [todos, setTodos] = useState([]);
	const [title, setTitle] = useState("");
	useLayoutEffect(() => {
		const fetchTodos = async () => {
			try {
				let res = await axios.get(API_URL);
				setTodos(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTodos();
	}, []);

	//call api update todo
	const updateTodo = async (newTitle, statusNew, id) => {
		try {
			await axios.put(`${API_URL}/${id}`, {
				title: newTitle !== null ? newTitle : null,
				status: statusNew !== null ? statusNew : null,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleToggleStatus = (id) => {
		let todosNew = todos.map((n) => {
			if (n.id === id) {
				n.status = !n.status;
				let { status: statusNew } = n;
				updateTodo(null, statusNew, id);
			}
			return n;
		});
		setTodos(todosNew);
	};

	const handleUpdateTitle = async (id) => {
		let oldTitle = todos.find((n) => n.id === id).title;
		let newTitle = window.prompt("Title", oldTitle);
		newTitle !== oldTitle &&
			newTitle !== null &&
			updateTodo(newTitle, null, id) &&
			setTodos(
				todos.map((n) => {
					if (n.id === id) {
						n.title = newTitle;
					}
					return n;
				})
			);
	};

	const handleDelete = async (id) => {
		try {
			await axios
				.delete(`${API_URL}/${id}`)
				.then(() => setTodos(todos.filter((n) => n.id !== id)));
		} catch (error) {
			console.log(error);
		}
	};

	const handleAdd = () => {
		try {
			axios
				.post(`${API_URL}`, {
					title: title,
				})
				.then((res) => {
					setTodos([...todos, res.data]);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h2>TodoList App</h2>

			<input
				placeholder="Enter title..."
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>
			<button onClick={() => handleAdd()}>Add</button>

			<ul>
				{todos.length === 0 && (
					<li>
						Không có công việc nào trong danh sách
					</li>
				)}
				{todos.length > 0 &&
					todos.map((todo) => (
						<li key={todo.id}>
							<input
								type="checkbox"
								checked={todo.status}
								onChange={() => handleToggleStatus(todo.id)}
							/>
							<span className={todo.status ? "active" : ""}>{todo.title}</span>
							<button onClick={() => handleUpdateTitle(todo.id)}>Update</button>
							<button onClick={() => handleDelete(todo.id)}>Delete</button>
						</li>
					))}
			</ul>
		</>
	);
}

export default TodoList;
