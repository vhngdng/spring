import "./App.css";
// import Content from './component/Content';
// import Post from './component/post/Post';
import { useState } from "react";
import Blog from "./component/blog/Blog";
import TodoList from "./component/todolist/TodoList";
// import Menu from "./component/menu/Menu";
function App() {
  const [isShow, setIsShow] = useState(true);
  const toggle = () => {
    setIsShow(!isShow);
  }

	return (
		<>
			{/* <Content /> */}

			{/* <hr /> */}

			{/* <Post /> */}

			<hr />
      {/* {isShow && <Menu />} */}
      {/* <Blog /> */}
      {/* <button onClick={toggle}>Toggle</button> */}
      <TodoList />
		</>
	);
}

export default App;
