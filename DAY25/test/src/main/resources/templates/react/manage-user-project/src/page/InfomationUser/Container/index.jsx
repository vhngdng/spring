import React from "react";
import ButtonBackAndUpdate from "../ButtonBackAndUpdate";
import Content from "./Content";

function Container() {
	return (
		<div className="container mt-5 mb-5">
			<h2 className="text-center text-uppercase mb-3">Thông tin user</h2>
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="bg-light p-4">
						<Content />
					</div>
					<div className="text-center mt-3">
						<ButtonBackAndUpdate />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Container;
