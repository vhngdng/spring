import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetBlogsPagingQuery } from "../../app/services/blog.service";
import { formatDate } from "../../utils/functionUtils";
function BlogList() {
	const location = useLocation();
	const page = new URLSearchParams(location.search).get("page");
	const [thisPage, setThisPage] = useState();
	const { data: blogsPaging, isLoading: pagingLoading } =
		useGetBlogsPagingQuery(page === null ? 0 : page - 1, {
			preferCacheValue: true,
		});

	console.log("blogsPaging", blogsPaging);
	console.log("page", page);
	// console.log("current page", blogsPaging.pageable.pageNumber + 1);
	if (pagingLoading) return <h2>isLoading....</h2>;

	const pageList = [];
	for (let i = 1; i <= blogsPaging.totalPages; i++) {
		pageList.push(i);
	}

	return (
		<div>
			<div className="container-fluid">
				<div className="row py-2">
					<div className="col-12">
						<button type="button" className="btn btn-primary">
							<i className="fas fa-plus"></i> Viết bài
						</button>
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
											<th>Tiêu đề</th>
											<th>Tác giả</th>
											<th>Danh mục</th>
											<th>Trạng thái</th>
											<th>Ngày tạo</th>
										</tr>
									</thead>
									<tbody>
										{blogsPaging.content &&
											blogsPaging.content.map((b) => (
												<tr key={b.id}>
													<td>
														<Link to={`/admin/blogs/${b.id}`}>{b.title}</Link>
													</td>
													<td>
														<Link to={`/admin/users/${b.author.id}`}>
															{b.author.name}
														</Link>
													</td>
													<td>{b.categories.map((c) => c.name).join(", ")}</td>
													<td>{b.status ? "Công khai" : "Nhap"}</td>
													<td>{formatDate(b.createdAt)}</td>
												</tr>
											))}
									</tbody>
								</table>

								<div
									className="d-flex justify-content-center mt-3"
									id="pagination"
								>
									<ul className="pagination mb-0">
										{blogsPaging.pageable.pageNumber > 0 && (
											<li
												className="paginate_button page-item previous"
												id="example2_previous"
											>
												<Link
													to={
														blogsPaging.pageable.pageNumber === 1
															? ""
															: `/?page=${blogsPaging.pageable.pageNumber - 1}`
													}
													aria-controls="example2"
													data-dt-idx="0"
													tabIndex="0"
													className="page-link"
												>
													Previous
												</Link>
											</li>
										)}
										{pageList.map((p, index) => (
											<li
												className={`paginate_button page-item ${
													page === null
														? p === 1
															? "active"
															: ""
														: p === blogsPaging.pageable.pageNumber + 1
														? "active"
														: ""
												}`}
												key={index}
											>
												<Link
													to={p === 1 ? `` : `?page=${p}`}
													aria-controls="example2"
													data-dt-idx="1"
													tabIndex="0"
													className="page-link"
												>
													{p}
												</Link>
											</li>
										))}

										{blogsPaging.pageable.pageNumber <
											blogsPaging.totalPages - 1 && (
											<li
												className="paginate_button page-item next"
												id="example2_next"
											>
												<Link
													to={`/admin/blogs/?page=${
														blogsPaging.pageable.pageNumber + 2
													}`}
													aria-controls="example2"
													data-dt-idx="7"
													tabIndex="0"
													className="page-link"
												>
													Next
												</Link>
											</li>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BlogList;
