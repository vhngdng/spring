import React, { useState, createContext, useEffect, useRef, useCallback, useLayoutEffect } from "react";

const ProductContext = createContext();
const productListMount = [
	{
		id: 1,
		name: "Sản phẩm 1",
		image:
			"https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
		price: 300000,
		count: 1,
		size: "M",
	},
	{
		id: 2,
		name: "Sản phẩm 2",
		image:
			"https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
		price: 400000,
		count: 1,
		size: "L",
	},
	{
		id: 3,
		name: "Sản phẩm 3",
		image:
			"https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
		price: 500000,
		count: 1,
		size: "XL",
	},
];

function ProductProvider({children}) {
  const [productList, setProductList] = useState([]);
	const [totalMoney, setTotalMoney] = useState(0);

	useEffect(() => {
		setProductList(productListMount);
	}, []);

	useLayoutEffect(() => {
		setTotalMoney(() =>
			productListMount.reduce((n, curr) => n + curr.price, 0)
		);
	}, []);

	const productAmount = useRef();

	const handleAddCount = useCallback(
		(id) => {
			let newList = productList.map((product) => {
				product.id === id &&
					(product.count += 1) &&
					setTotalMoney((prev) => prev + product.price);
				return product;
			});
			setProductList(newList);
		},
		[productList]
	);

	const handleDeleteCount = useCallback(
		(id) => {
			let newList = productList.map((product) => {
				product.id === id &&
					product.count >= 2 &&
					(product.count -= 1) &&
					setTotalMoney((prev) => prev - product.price);
				return product;
			});
			setProductList(newList);
		},
		[productList]
	);

	const deleteProduct = useCallback(
		(id) => {
			let checkConfirm = window.confirm();
			if (checkConfirm === true) {
				let newList = productList.filter((product) => product.id !== id);
				setProductList(newList);
				setTotalMoney(() => newList.reduce((n, curr) => n + curr.price, 0));
			}
		},
		[productList]
	);
	return (
		<ProductContext.Provider
			value={{
        productList,
				productAmount,
				handleAddCount,
				handleDeleteCount,
				deleteProduct,
        totalMoney
			}}
		>
      {children}
    </ProductContext.Provider>
	);
}

export { ProductContext, ProductProvider };
