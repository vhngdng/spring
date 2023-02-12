import React from "react";
import { Link } from "react-router-dom";
import { useCreateUserMutation } from "../../../app/api/userApi";
function ButtonComponent() {
	const { createUser } = useCreateUserMutation();
	return (
		<div className="text-center mt-3">
			<button className="btn btn-secondary btn-back">
				<Link to="/">Quay lại</Link>
			</button>
			<Link to="/">
				<button className="btn btn-success" id="btn-save">
					Tạo User
				</button>
			</Link>
		</div>
	);
}

export default ButtonComponent;
