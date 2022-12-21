import React from "react";
import BoxItem from "./BoxItem";

function Box({boxes, removeBox}) {

	return (
		<>
			<div className="box-list">
				{boxes.map((i, index) => (
					<BoxItem
						key={i}
						point={i}
						removeBox={removeBox}
					/>
				))}
			</div>
		</>
	);
}

export default Box;
