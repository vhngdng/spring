import React from "react";
import ButtonComponent from "./component/Button";
import { useFetchProvinceQuery } from "../../app/api/provinceAPi";
import { useCreateUserMutation } from "../../app/api/userApi";

function CreateUser() {
	const { data, isLoading, error } = useFetchProvinceQuery();
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error occured!!!</div>;
	console.log(data.results);
	return (
		<div className="container mt-5 mb-5">
			<h2 className="text-center text-uppercase mb-3">Tạo user</h2>
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="bg-light p-4">
						<div className="mb-3">
							<label className="col-form-label">Name</label>
							<input type="text" id="name" className="form-control" />
						</div>
						<div className="mb-3">
							<label className="col-form-label">Email</label>
							<input type="text" id="email" className="form-control" />
						</div>
						<div className="mb-3">
							<label className="col-form-label">Phone</label>
							<input type="text" id="phone" className="form-control" />
						</div>
						<div className="mb-3">
							<label className="col-form-label">Address</label>
							<select className="form-select" id="address" defaultValue="01">
								{data.results.map((province, index) => (
									<option key={index} value={province.province_id}>
										{province.province_name}
									</option>
								))}
							</select>
						</div>
						<div className="mb-3">
							<label className="col-form-label">Password</label>
							<input type="text" id="password" className="form-control" />
						</div>
					</div>
					<ButtonComponent />
				</div>
			</div>
		</div>
	);
}

export default CreateUser;
