import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
	const navigate = useNavigate();
	const handleLogOut = () => {
		localStorage.removeItem("token-info");
		navigate("/");
	};
	return <button onClick={handleLogOut}>Logout</button>;
}

export default Logout;
