import { React, useState } from "react";

let input = document.querySelector(".input-value");
function List() {
	const [items, setItems] = useState(["Item1", "Item2", "Item3"]);
	const [isChecked, setChecked] = useState(true);

	// chua bai
	const [title, setTitle] = useState("");
	// chua bai
	const handleAdd = () => {
		if (title === "") {
			alert("Tiêu đề không được để trống");
			return;
		}
		setItems([...items, title]);
		setTitle("");
	};

	const handleToggle = () => {
		console.log(isChecked);
		setChecked(!isChecked);
	};

	const handleInputValue = () => {
		let input = document.querySelector(".input-value").value;
		if (input === "") {
			alert("Tiêu đề không được để trống");
			return;
		}
		console.log(input);
		setItems([...items, input]);
	};

	const removeItem = () => {
		console.log(items[items.length - 1]);
		setItems(items.filter((item) => item !== items[items.length - 1]));
	};

	// chua bai
	const handleRemove = () => {
		if (items.length === 0) return;
		const newItems = items.slice(0, -1);
		setItems(newItems);
	};

	return (
		<>
			<button onClick={handleToggle}>{isChecked ? "Hide" : "Show"}</button>
			<input
				className="input-value"
				type="text"
				placeholder="Enter name"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<button onClick={handleAdd}>Add</button>

			<button onClick={handleRemove}>Remove</button>
			{isChecked === true && (
				<ul className="list-item">
					{items.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			)}
		</>
	);
}

export default List;
