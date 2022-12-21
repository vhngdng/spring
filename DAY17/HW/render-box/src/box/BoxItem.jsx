import React from "react";

let colors = ["#3498db", "#9b59b6", "#e74c3c", "#2c3e50", "#d35400"];
let length = colors.length;

function BoxItem({point, removeBox}) {
	let colorNum = point % length;
	return (
		<div
			className="box"
			style={{ backgroundColor: colors[colorNum] }}
			onClick={(event) => removeBox(point, event)}
		></div>
	);
}

export default BoxItem;
