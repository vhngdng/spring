import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Counter from "./components/counter/Counter";
import TodoList from "./components/todoList/TodoList";
import NotFound from "./components/not-found/NotFound";

function App() {
	return (
		<div className="App">
			<ul>
				<li>
					<Link to={"/counter"}>Counter App</Link>
				</li>
				<li>
					<Link to={"/todoList"}>Todo App</Link>
				</li>
			</ul>

			<Routes>
				<Route path="/" element={<Counter />} />
				<Route path="/counter" element={<Counter />} />
				<Route path="/todoList" element={<TodoList />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
