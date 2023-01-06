import React, {memo} from "react";

function ProductItem({
	product,
	productAmount,
	handleAddCount,
	handleDeleteCount,
	deleteProduct,
}) {
	return (
		<>
			<div className="product-item d-flex border mb-4">
				<div key={product.image} className="image">
					<img src={product.image} alt={product.name} className="img-fluid"/>
				</div>
				<div
					key={product.id}
					className="info d-flex flex-column justify-content-between px-4 py-3 flex-grow-1"
				>
					<div>
						<div className="d-flex justify-content-between align-items-center">
							<h2 className="text-dark fs-5 fw-normal">
								{product.name} ({product.size})
							</h2>
							<h2 className="text-danger fs-5 fw-normal">{product.price}</h2>
						</div>
						<div className="text-black-50">
							<div className="d-inline-block me-3">
								<button
									className="border py-2 px-3 d-inline-block fw-bold bg-light"
									onClick={() => handleDeleteCount(product.id)}
								>
									-
								</button>
								<span
									className="py-2 px-3 d-inline-block fw-bold"
									ref={productAmount}
								>
									{product.count}
								</span>
								<button
									className="border py-2 px-3 d-inline-block fw-bold bg-light"
									onClick={() => handleAddCount(product.id)}
								>
									+
								</button>
							</div>
						</div>
					</div>
					<div>
						<button
							className="text-primary border-0 bg-transparent fw-light"
							onClick={() => deleteProduct(product.id)}
						>
							<span>
								<i className="fa-solid fa-trash-can"></i>
							</span>
							Xóa
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default memo(ProductItem);
