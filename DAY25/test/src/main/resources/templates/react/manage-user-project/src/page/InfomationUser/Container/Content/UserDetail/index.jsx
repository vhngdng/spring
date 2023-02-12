import React from "react";
function UserDetail({ user }) {
	console.log(user);
	return (
		<>
			<div className="mb-3">
				<label className="col-form-label">Fullname</label>
				<input
					type="text"
					id="fullname"
					className="form-control"
					value={user.name}
					// onChange={}
				/>
			</div>
			<div className="mb-3">
				<label className="col-form-label">Email</label>
				<input
					type="text"
					id="email"
					className="form-control"
					disabled=""
					value={user.email}
				/>
			</div>
			<div className="mb-3">
				<label className="col-form-label">Phone</label>
				<input
					type="text"
					id="phone"
					className="form-control"
					disabled=""
					value={user.phone}
				/>
			</div>
			<div className="mb-3">
				<label className="col-form-label">Address</label>
				<select className="form-select" id="address"></select>
			</div>
			<div className="mb-3">
				<label className="form-label">Avatar</label>
				<div className="avatar-preview mb-3 rounded">
					<image
						src="http://localhost:8079https://s3.amazonaws.com/uifaces/faces/twitter/ahmetalpbalkan/128.jpg"
						alt="avatar"
						id="avatar-preview"
						className="rounded"
					/>
				</div>
				<button
					id="btn-modal-image"
					type="button"
					className="btn btn-warning"
					data-bs-toggle="modal"
					data-bs-target="#modal-image"
				>
					Chọn ảnh
				</button>
			</div>
			<div className="mb-3">
				<label className="col-form-label">Password</label>
				<div>
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#modal-change-password"
					>
						Đổi mật khẩu
					</button>
					<button className="btn btn-warning" id="btn-forgot-password">
						Quên mật khẩu
					</button>
				</div>
			</div>
		</>
	);
}

export default UserDetail;
