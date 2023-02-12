import { useState } from "react";
import {
	useFetchTodoQuery,
	useAddTodoMutation,
	useDeleteTodoMutation,
	useUpdateTodosMutation,
} from "../../app/api";
function TodoList() {
	const [title, setTitle] = useState("");
	const {
		data: todos,
		isLoading: todosLoading,
		isError: todosError,
	} = useFetchTodoQuery();
	const [addTodo, { isLoading: addLoading, isError: addError }] =
		useAddTodoMutation();
	const [updateTodo, { isLoading: updateLoading, isError: updateError }] =
		useUpdateTodosMutation();
	const [deleteTodo, { isLoading: deleteLoading, isError: deleteError }] =
		useDeleteTodoMutation();
	if (todosLoading || addLoading || updateLoading || deleteLoading)
		return <div>Loading....</div>;
	if (todosError || addError || updateError || deleteError)
		return <div>An error has occured!!!!</div>;

	console.log(todos);
	const handleAdd = async () => {
		if (title === "") {
			alert("Tieu de khong duoc de trong");
			return;
		}
		const newTodo = {
			title,
		};
		await addTodo(newTodo);
		setTitle("");
	};

	const handleToggleStatus = (id) => {
		const currentTodo = todos.find((todo) => todo.id === id);
		const updatedTodo = {
			...currentTodo,
			status: !currentTodo.status,
		};
		updateTodo(updatedTodo);
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
		updateTodo(updatedTodo);
	};

	const handleDelete = (id) => {
		// TODO : THem confirm truoc khi xoa
		if (window.confirm("Bạn có muốn xoá")) deleteTodo(id);
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
