import React from "react";
import ListUser from "../ListUser";
import { Link } from "react-router-dom";
function Content() {
	return (
		<div className="row justify-content-center">
			<div className="col-md-10">
				<div className="d-flex justify-content-between align-items-center mt-5 mb-4">
					<Link to="/create-user" className="btn btn-warning">
						Tạo user
					</Link>
					<input
						type="text"
						id="search"
						className="form-control w-50"
						placeholder="Tìm kiếm user"
					/>
				</div>
				<ListUser />
				<p className="message d-none"></p>
			</div>
		</div>
	);
}

export default Content;
