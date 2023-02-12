import React from "react";
import { Link } from "react-router-dom";

function UpdateButton() {
	return (
		<button className="btn btn-secondary btn-back">
			<Link to="/update">Update</Link>
		</button>
	);
}

export default UpdateButton;
