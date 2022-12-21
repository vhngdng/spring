import React from "react";
import BoxItem from "./BoxItem";

let j = 0;

function Box({boxes, removeBox}) {
	return (
		<>
			<div className="box-list">
				{boxes.map((i) => (
					<BoxItem
						key={j++}
						point={i}
						removeBox={removeBox}
					/>
				))}
			</div>
		</>
	);
}

export default Box;
