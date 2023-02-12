import React from "react";
import User from "./User";
import { useFetchUsersQuery } from "../../app/api/userApi";
function ListUser() {
	const {
		data: users,
		isLoading: usersLoading,
		isError: usersError,
	} = useFetchUsersQuery();
	console.log(users);
	if (usersLoading) return <div>Loading....</div>;
	if (usersError) return <div>An error has occured!!!!</div>;

	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th>STT</th>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Address</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{users.map((user, index) => (
					<User key={index} user={user} />
				))}
			</tbody>
		</table>
	);
}

export default ListUser;
