import "./App.css";
import { React, useState, useEffect } from "react";
import Box from "./box/Box";

function App() {
	const [boxes, setBoxes] = useState([]);

	const handleAddBox = () => {
		for (let i = 0; i < 5; i++) {
			setBoxes((prev) => [...prev, prev.length + 1]);
		}
	};

	const removeBox = (id) => {
		setBoxes(boxes.filter(box => box !== id));
	};

	return (
		<>
			<button id="btn" onClick={handleAddBox}>
				More boxes
			</button>
			<h4 id="score">
				Total box:<span className="points">{boxes.length}</span>
			</h4>
			<div className="boxes">
				{boxes.length && <Box boxes={boxes} removeBox={removeBox} />}
			</div>
		</>
	);
}

export default App;
