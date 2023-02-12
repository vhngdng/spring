import "./App.css";
import Container from "./component/Container";
import { Route, Routes } from "react-router-dom";
import InformationUserContainer from "./page/InfomationUser/Container";
import CreateUser from "./page/createUser";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Container />} />
				<Route
					path="/detail/:id/"
					element={<InformationUserContainer />}
					// children={<Information />}
				/>
				<Route
					path="/create-user"
					element={<CreateUser />}
					// children={<Information />}
				/>
			</Routes>
		</>
	);
}

export default App;
