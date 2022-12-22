import "./App.css";
import React from "react";
import Counter from "./components/counter/Counter";
import Content from "./components/content/Content";
import Menu from "./components/ menu/Menu";
import List from "./components/list/List";
import Theme from "./components/theme/Theme";
import RandomUser from "./components/user/RandomUser";


const menus = [
	{ path: "/", label: "Trang chủ" },
	{ path: "/shop", label: "Cửa hàng" },
	{ path: "/about", label: "Về chúng tôi" },
	{ path: "/contact", label: "Liên hệ" },
];

function App() {
	return (
		<React.Fragment>
			<h1
				className="heading"
				style={{ color: "red", backgroundColor: "black" }}
			>
				Hello World {1 + 1}
			</h1>
			initialState
			<div className="intro-content">
				<h1 className="intro-title">Fashion Trends</h1>
				<p className="intro-description">
					There are some trends that are just too plain wacky to really affect
					your wardrobe, so for that reason we've left out a few ideas we know
					you'd rather sidestep.
				</p>
				<a href="#" className="intro-btn">
					Buy now
				</a>
			</div>
			<Menu menus={menus} name={"Nguyen Van A	"} />
			<Counter />
			<Content />
			<hr />
			<List />
			<hr />
			<Theme />

			<hr />
			<RandomUser />

		</React.Fragment>
	);
}

export default App;
