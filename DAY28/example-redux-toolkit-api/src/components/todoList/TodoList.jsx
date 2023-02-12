import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addTodo,
	deleteTodo,
	fetchTodos,
	updateTodo,
} from "../../app/slices/todo.slice";
function TodoList() {
	const todos = useSelector((state) => state.todos);
	const dispatch = useDispatch();
	console.log(todos);
	const [title, setTitle] = useState("");

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	const handleAdd = () => {
		if (title === "") {
			alert("Tieu de khong duoc de trong");
			return;
		}
		const newTodo = {
			title,
		};
		dispatch(addTodo(newTodo));
		setTitle("");
	};

	const handleToggleStatus = (id) => {
		const currentTodo = todos.find((todo) => todo.id === id);
		const updatedTodo = {
			...currentTodo,
			status: !currentTodo.status,
		};
		dispatch(updateTodo(updatedTodo));
	};

	const handleUpdateTitle = (id) => {
		const currentTodo = todos.find((todo) => todo.id === id);
		const newTitle = window.prompt("Cập nhật tiêu đề", currentTodo.title);
		if (newTitle === null) return;
		if (newTitle === "") {
			alert("Tieu de khong duoc de trong");
			return;
		}
		const updatedTodo = {
			id,
			title: newTitle,
			status: currentTodo.status,
		};
		dispatch(updateTodo(updatedTodo));
	};

	const handleDelete = (id) => {
		// TODO : THem confirm truoc khi xoa
		if (window.confirm("Bạn có muốn xoá")) dispatch(deleteTodo(id));
	};

	return (
		<>
			<h2>TodoList App</h2>

			<input
				type="text"
				placeholder="Enter title ..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<button onClick={handleAdd}>Add</button>

			<ul>
				{todos.length === 0 && <li>Không có công việc nào trong danh sách</li>}
				{todos.length > 0 &&
					todos.map((todo) => (
						<li key={todo.id}>
							<input
								type="checkbox"
								checked={todo.status}
								onChange={() => handleToggleStatus(todo.id)}
							/>
							<span className={todo.status ? "active" : ""}>{todo.title}</span>
							<button onClick={() => handleUpdateTitle(todo.id)}>update</button>
							<button onClick={() => handleDelete(todo.id)}>delete</button>
						</li>
					))}
			</ul>
		</>
	);
}

export default TodoList;
