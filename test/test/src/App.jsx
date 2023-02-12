import "./App.css";
import ProductList from "./component/product/ProductList";
import {} from "./ProductContext";
import React, { useContext } from "react";
import Bill from "./component/bill/Bill";
import { ProductContext} from "./ProductContext";

function App() {
	const {totalMoney} = useContext(ProductContext);
	console.log(totalMoney);
	return (
		<>
			{totalMoney === 0 && (
				<p className="fst-italic message">Không có sản phẩm trong giỏ hàng</p>
			)}
			<div className="row shopping-cart">
				<div className="col-md-8">
					<ProductList />
				</div>
				<div className="col-md-4">
					<Bill />
				</div>
			</div>
		</>
	);
}

export default App;
