import React, {useContext} from "react";
import { ProductContext } from "../../ProductContext";

function Bill() {
	let {totalMoney} = useContext(ProductContext);
	console.log(totalMoney);

	return (
		<div className="bill">
			<div className="border mb-2 p-3 fs-5 fw-normal d-flex justify-content-between align-items-center">
				<span className="text-black-50">Tạm tính:</span>
				<span className="text-primary" id="sub-total-money">
					{totalMoney}
				</span>
			</div>
			<div className="border mb-2 p-3 fs-5 fw-normal d-flex justify-content-between align-items-center">
				<span className="text-black-50">VAT (10%):</span>
				<span className="text-primary" id="vat-money">
					{totalMoney / 10}
				</span>
			</div>
			<div className="border mb-2 p-3 fs-5 fw-normal d-flex justify-content-between align-items-center">
				<span className="text-black-50">Thành tiền:</span>
				<span className="text-primary" id="total-money">
					{totalMoney + totalMoney / 10}
				</span>
			</div>
		</div>
	);
}

export default Bill;
