import React, {memo, useContext} from "react";
import ProductItem from "./ProductItem";
import { ProductContext } from "../../ProductContext";

function ProductList() {
	let {productList} = useContext(ProductContext);

	return (
			<div className="product-list">
				{productList.map((product) => (
					<ProductItem
						key={product.id}
						product={product}
					/>
				))}
			</div>
	);
}

export default memo(ProductList);
