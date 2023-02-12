import React, { useState, useRef } from "react";
import {
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
	useUpdateCategoryMutation,
} from "../../app/services/categories.service";
import Modal from "react-modal";

const customStyles = {
	content: {
		top: "30%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

function CategoryList() {
	const { data: categories, isLoading, refetch } = useGetCategoriesQuery();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);

	const [name, setName] = useState("");
	const [idCategory, setIdCategory] = useState(0);

	const ref = useRef();
	const containerRef = useRef();

	const [updateCategory] = useUpdateCategoryMutation();
	const [deleteCategory] = useDeleteCategoryMutation();
	const [createCategory] = useCreateCategoryMutation();
	if (isLoading) return <h2>Loadinggggggg..............</h2>;

	const handleOpenModalUpdate = (e, name, id) => {
		setIdCategory(id);
		setName(name);
		setModalIsOpen(true);
	};
	const handleChangeNameCategory = (name, id) => {
		setName(name);
		updateCategory({ id, name })
			.unwrap()
			.then((data) => {
				console.log(data);
				setTimeout(() => {
					alert("Thay đổi tên category thành công");
					refetch();
				}, 500);
			})
			.catch((err) => console.log(err));
		setModalIsOpen(false);
	};
	const closeModal = () => {
		setModalIsOpen(false);
	};

	const closeCreateModal = () => {
		setModalCreateIsOpen(false);
	};

	const handleDelete = async (id) => {
		try {
			await deleteCategory(id);
			refetch();

			console.log("success");
			setTimeout(() => {
				alert("Xoá category thành công");
				setIdCategory(0);
			}, 500);
		} catch (err) {
			console.log(err);
		}
	};

	const handleCreateCategory = (name) => {
		setName(name);
		if (name !== "") {
			setName(name);
			createCategory({ name })
				.unwrap()
				.then((data) => {
					console.log(data);
					setTimeout(() => {
						alert("Tạo category thành công");
						refetch();
					}, 500);
				})
				.catch((err) => {
					console.error(err);
					alert(err.data.message);
				});
			setModalCreateIsOpen(false);
		} else {
			alert("Tên không được để trống");
		}
	};
	return (
		<div className="container-fluid" ref={containerRef}>
			<div className="row py-2">
				<div className="col-12">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => setModalCreateIsOpen(true)}
					>
						<i className="fas fa-plus"></i> Thêm danh mục
					</button>
					<Modal
						isOpen={modalCreateIsOpen}
						onRequestClose={closeCreateModal}
						style={customStyles}
						contentLabel="Category Name"
						appElement={ref.current}
					>
						<h2>Create new category</h2>
						<input
							defaultValue=""
							type="text"
							onChange={(e) => setName(e.target.value)}
							autoFocus
						/>
						<button
							className="btn btn-outline-success"
							onClick={() => handleCreateCategory(name)}
						>
							Confirm
						</button>
						<button
							className="btn btn-outline-danger"
							onClick={closeCreateModal}
						>
							Cancel
						</button>
					</Modal>
					<button type="button" className="btn btn-info">
						<i className="fas fa-redo"></i> Refresh
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card-body">
							<table className="table table-bordered table-hover">
								<thead>
									<tr>
										<th>Tên danh mục</th>
									</tr>
								</thead>
								<tbody id="list-categories" ref={ref}>
									{categories &&
										categories.map((c) => (
											<tr key={c.id}>
												<td className="category-name">{c.name}</td>

												<td>
													<button
														className="btn btn-info"
														onClick={(e) =>
															handleOpenModalUpdate(e, c.name, c.id)
														}
													>
														Update
													</button>
													<Modal
														isOpen={modalIsOpen}
														onRequestClose={closeModal}
														style={customStyles}
														contentLabel="Category Name"
														appElement={ref.current}
													>
														<h2>Update name of category</h2>
														<input
															type="text"
															defaultValue={name}
															onChange={(e) => setName(e.target.value)}
														/>
														<button
															className="btn btn-outline-success"
															onClick={() =>
																handleChangeNameCategory(name, idCategory)
															}
														>
															Confirm
														</button>
														<button
															className="btn btn-outline-danger"
															onClick={closeModal}
														>
															Cancel
														</button>
													</Modal>
												</td>
												<td>
													<button
														className="btn btn-danger"
														onClick={() => handleDelete(c.id)}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CategoryList;
