import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Offers from "./pages/Offers.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Explore />}></Route>
					<Route path="/offers" element={<Offers />}></Route>
					<Route path="/profile" element={<SignIn />}></Route>
					<Route path="/sign-in" element={<SignIn />}></Route>
					<Route path="/sign-up" element={<SignUp />}></Route>
					<Route path="/profile" element={<Profile />}></Route>
					<Route
						path="/forgot-password"
						element={<ForgotPassword />}
					></Route>
				</Routes>
				<Navbar />
			</Router>
		</>
	);
}

export default App;
