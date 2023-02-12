import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import Sidebar from "../sidebar/Sidebar";

function Layout() {
	return (
		<>
			<Sidebar />
			<div className="wrapper-container">
				<Navigation />

				<section className="content">
					<Outlet /> {/* HIển thị những nội dung linh động*/}
				</section>
			</div>
		</>
	);
}

export default Layout;
