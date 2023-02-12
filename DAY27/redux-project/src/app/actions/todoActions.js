export const addTodo = (todo) => {
	return {
		type: "todo/addTodo",
		payload: todo,
	};
};

export const deleteTodo = (id) => {
	return {
		type: "todo/deleteTodo",
		payload: {
			id,
		},
	};
};

export const updateTodo = (todo) => {
	return {
		type: "todo/updateTodo",
		payload: todo,
	};
};
