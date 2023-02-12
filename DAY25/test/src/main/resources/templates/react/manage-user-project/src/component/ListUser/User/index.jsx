import React from "react";
import { Link } from "react-router-dom";
function User({ user }) {
	return (
		<tr>
			<td>{user.id}</td>
			<td>{user.name}</td>
			<td>{user.email}</td>
			<td>{user.phone}</td>
			<td>{user.address}</td>
			<td>
				<Link
					to={{ pathname: `/detail/${user.id}` }}
					className="btn btn-success"
				>
					Xem chi tiết
				</Link>
				<button className="btn btn-danger">Xóa</button>
			</td>
		</tr>
	);
}

export default User;
