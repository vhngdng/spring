const initialState = [
	{ id: 1, title: "Đá bóng", status: false },
	{ id: 2, title: "Làm bài tập", status: true },
	{ id: 3, title: "Đi chơi", status: true },
];

const todoReducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case "todo/addTodo": {
			return [...state, action.payload];
		}

		case "todo/deleteTodo": {
			return state.filter((todo) => todo.id !== action.payload.id);
		}

		case "todo/updateTodo": {
			return state.map((todo) => {
				if (todo.id === action.payload.id) {
					return { ...todo, ...action.payload };
				}
				return todo;
			});
		}

		default: {
			return state;
		}
	}
};

export default todoReducer;
