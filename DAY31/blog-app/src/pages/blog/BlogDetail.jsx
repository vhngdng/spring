import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SimpleMdeReact from "react-simplemde-editor";
import Select from "react-select";
import {
	useGetBlogByIdQuery,
	useUpdateBlogMutation,
} from "../../app/services/blog.service";
import { useGetCategoriesQuery } from "../../app/services/categories.service";
import { useUploadImageMutation } from "../../app/services/images.service";
function BlogDetail() {
	const { blogId } = useParams();
	const { data: categories, isLoading: categoryLoading } =
		useGetCategoriesQuery({ preferCacheValue: true });
	const [uploadImage] = useUploadImageMutation();
	const [updateBlog] = useUpdateBlogMutation();
	const { data: blog, isLoading } = useGetBlogByIdQuery(blogId);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState(false);
	const [categoryIds, setCategoryIds] = useState([]);
	const [thumbnail, setThumbnail] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading) {
			setTitle(blog.title);
			setContent(blog.content);
			setDescription(blog.description);
			setStatus(blog.status);
			setCategoryIds(categories && options.value);
			setThumbnail(blog.thumbnail ? blog.thumbnail : "");
		}
	}, [blog, categories, blogId]);
	if (isLoading || categoryLoading) return <h2>Loading.....</h2>;
	const handleChangeCategory = (data) => {
		const ids = data.map((e) => e.value);
		setCategoryIds(ids);
	};
	const options =
		categories &&
		categories.map((c) => ({
			value: c.id,
			label: c.name,
		}));

	console.log("blog", blog);
	const navigateMainAdminPage = () => {
		navigate("../");
	};

	const handleUpdateBlog = () => {
		const updatedBlog = {
			id: blogId,
			title,
			content,
			description,
			status,
			categoryIds,
			thumbnail,
		};
		console.log(categoryIds);
		updateBlog(updatedBlog)
			.unwrap()
			.then(() => {
				alert("Cap nhat thanh cong");
			})
			.catch((err) => console.error(err));
	};

	const handleUploadThumbnail = (e) => {
		//Lấy ra file vừa chọn
		const file = e.target.files[0];
		console.log(file);
		const formData = new FormData();
		formData.append("file", file);
		uploadImage(formData)
			.unwrap()
			.then((res) => {
				console.log(res.url);
				setThumbnail(res.url);
				alert("Upload thành công");
			})
			.catch((err) => console.error(err));
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
						onClick={handleUpdateBlog}
					>
						Lưu
					</button>
				</div>

				<div className="col-6 d-flex justify-content-end">
					<button type="button" className="btn btn-danger px-4">
						Xóa
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
											defaultValue={blog.title}
											onChange={(e) => setTitle(e)}
										/>
									</div>
									<div className="form-group">
										<label>Nội dung</label>
										<SimpleMdeReact
											value={blog.content}
											onChange={(value) => setContent(value)}
										/>
									</div>
									<div className="form-group">
										<label>Mô tả ngắn</label>
										<SimpleMdeReact
											value={blog.description}
											onChange={(value) => setDescription(value)}
										/>
									</div>
									Aut eos assumenda quas veniam consectetur accusantium
									repudiandae sit est harum.
								</div>

								<div className="col-md-4">
									<div className="form-group">
										<label>Trạng thái</label>
										<select
											id="status"
											className="form-control"
											value={blog.status ? "1" : "0"}
											onChange={(e) =>
												setStatus(e.target.value === "0" ? false : true)
											}
										>
											<option value="0">Nháp</option>
											<option value="1">Công khai</option>
										</select>
									</div>
									<div className="form-group">
										<label>Danh mục</label>
										<div className="select2-purple">
											<Select
												options={options}
												isMulti
												onChange={handleChangeCategory}
												defaultValue={blog.categories.map((c) => ({
													value: c.id,
													label: c.name,
												}))}
											/>
										</div>
									</div>
									<div className="form-group">
										<div className="thumbnail-preview-container mb-3">
											{thumbnail !== "" && (
												<img
													src={`http://localhost:8080/${thumbnail}`}
													alt=""
													id="thumbnail"
												/>
											)}
										</div>
										<label
											type="button"
											className="btn btn-info btn-flat"
											htmlFor="input-file"
										>
											Chọn hình ảnh
										</label>
										<input
											type="file"
											id="input-file"
											className="d-none"
											onChange={(e) => handleUploadThumbnail(e)}
										/>
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

export default BlogDetail;
