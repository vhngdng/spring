/* eslint-disable no-unused-expressions */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const handleLogin = async () => {
		try {
			const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
				username,
				password,
			});
			console.log(res);
			localStorage.setItem("token-info", JSON.stringify(res.data));
			navigate("/home");
		} catch (err) {
			console.log(err);
		}
	};
	const handlePressEnter = (e) => {
		console.log(e);
		if (e.key === "Enter") {
			handleLogin();
		}
	};
	return (
		<center>
			<div className="login-form" onSubmit={handleLogin}>
				<div>
					<label className="input-form">
						User Name:
						<input
							autoFocus
							type="text"
							placeholder="username"
							defaultValue={username}
							onChange={(e) => setUsername(e.target.value)}
							onKeyDown={(e) => {
								handlePressEnter(e);
							}}
						/>
					</label>
				</div>
				<div>
					<label className="input-form">
						Password:
						<input
							type="password"
							placeholder="password"
							defaultValue={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyDown={(e) => {
								handlePressEnter(e);
							}}
						/>
					</label>
				</div>
			</div>
			<button type="submit" onClick={handleLogin}>
				Submit
			</button>
		</center>
	);
}

export default Login;
