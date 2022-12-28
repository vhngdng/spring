import React from "react";
import ProductItem from "./ProductItem";

function ProductList({
	productList,
	productAmount,
	handleAddCount,
	handleDeleteCount,
	deleteProduct,
}) {
	console.log(productList);
	return (
			<div className="product-list">
				{productList.map((product) => (
					<ProductItem
						key={product.id}
						product={product}
						productAmount={productAmount}
						handleAddCount={handleAddCount}
						handleDeleteCount={handleDeleteCount}
						deleteProduct={deleteProduct}
					/>
				))}
			</div>
	);
}

export default ProductList;
