import React from "react";
import { useParams } from "react-router-dom";
import { useFetchUserWithIdQuery } from "../../../../app/api/userApi";
import UserDetail from "./UserDetail";
function Information() {
	const id = useParams().id;
	const { data: user, isLoading, isError } = useFetchUserWithIdQuery(id);
	if (isLoading) return <div>Loading....</div>;
	if (isError) return <div>Error!!!!!!</div>;

	return (
		<>
			<div className="mb-3">
				<UserDetail user={user} />
			</div>
		</>
	);
}

export default Information;
