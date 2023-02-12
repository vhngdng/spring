import React from "react";
import { Link } from "react-router-dom";
function BackButton() {
	return (
		<button className="btn btn-secondary btn-back">
			<Link to="/">Quay lại</Link>
		</button>
	);
}

export default BackButton;
