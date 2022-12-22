import { React, useState } from "react";

let data = [
	{
		id: 1,
		name: "Bùi Hiên",
		email: "hien@gmail.com",
		address: "Thái Bình",
	},
	{
		id: 2,
		name: "Thu Hằng",
		email: "hang@gmail.com",
		address: "Hải Dương",
	},
	{
		id: 3,
		name: "Minh Duy",
		email: "duy@gmail.com",
		address: "Hưng Yên",
	},
];

const randomIndex = (num) => {
	return Math.floor(Math.random() * num);
};

function RandomUser() {
	let index = randomIndex(data.length);
	const [users, setUsers] = useState([...data]);
	const [user, setUser] = useState(users[index]);
	const handleChangeUser = () => {
		let index = randomIndex(users.length);
		setUser(users[index]);
	};

	const deleteUser = () => {
		let newUsers = users.filter((u) => u !== user);
		setUsers(newUsers);
		setUser(newUsers[randomIndex(newUsers.length)]);
	};
 
	return users.length === 0 ? (
    <center>
		<p style={{fontSize:'30px', color:'red'}}>Không còn user nào</p>
    </center>
	) : (
		<center>
			<h1>Name : {user.name}</h1>
			<div>
				<ul>
					<li style={{ listStylePosition: "inside" }}>Email : {user.email}</li>
					<li style={{ listStylePosition: "inside" }}>
						Address : {user.address}
					</li>
				</ul>
				{users.length > 1 && (
					<button onClick={handleChangeUser}>Random user</button>
				)}
				{users.length !== 0 && (
					<button onClick={deleteUser}>Delete user</button>
				)}
			</div>
		</center>
	);
}

export default RandomUser;
