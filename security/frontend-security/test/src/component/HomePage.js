import React from "react";
import { Navigate } from "react-router-dom";
import Logout from "./Logout";

function HomePage() {
	return localStorage.getItem("token-info") ? (
		<>
			<div>HomePage</div>
			<Logout />
		</>
	) : (
		<Navigate to="/" />
	);
}

export default HomePage;
