import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import SimpleMdeReact from "react-simplemde-editor";
import { useCreateBlogMutation } from "../../app/services/blog.service";
import { useGetCategoriesQuery } from "../../app/services/categories.service";
function BlogCreate() {
	const { data: categories, isLoading } = useGetCategoriesQuery();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState(false);
	const [categoryIds, setCategoryIds] = useState([]);
	const navigate = useNavigate();

	// if (isLoading) return <h2>Loading....</h2>;

	const [createBlog] = useCreateBlogMutation();

	const options =
		categories &&
		categories.map((c) => ({
			value: c.id,
			label: c.name,
		}));

	console.log("options", options);

	const handleChangeCategory = (data) => {
		const ids = data.map((e) => e.value);
		setCategoryIds(ids);
	};

	const handleAddBlog = async (e) => {
		e.preventDefault();
		const newBlog = {
			title,
			content,
			description,
			status,
			categoryIds,
		};
		await createBlog(newBlog)
			.unwrap()
			.then((data) => {
				alert("Tạo thành công");
				console.log(data);
				setTimeout(() => {
					navigate("/admin/blogs");
				}, 1000);
			})
			.catch((err) => alert(err));
	};

	const navigateMainAdminPage = () => {
		navigate("..");
	};
	return (
		<div className="container-fluid">
			<div className="row py-2">
				<div className="col-6">
					<button
						type="button"
						className="btn btn-default"
						onClick={navigateMainAdminPage}
					>
						<i className="fas fa-chevron-left"></i> Quay lại
					</button>
					<button
						type="button"
						className="btn btn-info px-4"
						onClick={handleAddBlog}
					>
						Lưu
					</button>
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<div className="col-md-8">
									<div className="form-group">
										<label>Tiêu đề</label>
										<input
											type="text"
											className="form-control"
											id="title"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
									</div>

									<div className="form-group">
										<label>Nội dung</label>
										<SimpleMdeReact
											value={content}
											onChange={(value) => setContent(value)}
										/>
									</div>

									<div className="form-group">
										<label>Mô tả ngắn</label>
										<textarea
											id="description"
											className="form-control"
											rows="3"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
										></textarea>
									</div>
								</div>

								<div className="col-md-4">
									<div className="form-group">
										<label>Trạng thái</label>
										<select
											id="status"
											className="form-control"
											value={status ? "1" : "0"}
											onChange={(e) =>
												setStatus(e.target.value === "0" ? false : true)
											}
										>
											<option value="0">Nháp</option>
											<option value="1">Công khai</option>
										</select>
										<label>Danh mục</label>
										<div className="select2-purple">
											<Select
												options={options}
												isMulti
												onChange={handleChangeCategory}
											/>
										</div>
									</div>
									<div className="form-group">
										<div className="thumbnail-preview-container mb-3">
											<img src="" alt="" id="thumbnail" />
										</div>
										<button
											type="button"
											className="btn btn-info btn-flat"
											data-toggle="modal"
											data-target="#modal-xl"
										>
											Chọn hình ảnh
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BlogCreate;
