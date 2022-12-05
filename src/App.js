import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Explore from "./pages/Explore.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Offers from "./pages/Offers.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Navbar from "./components/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./pages/Category.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import Listing from "./pages/Listing.jsx";
import Contact from "./pages/Contact.jsx";
import EditListing from "./pages/EditListing.jsx";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Explore />}></Route>
					<Route path="/offers" element={<Offers />}></Route>
					<Route
						path="/category/:categoryName"
						element={<Category />}
					></Route>
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />}></Route>
					</Route>
					<Route path="/sign-in" element={<SignIn />}></Route>
					<Route path="/sign-up" element={<SignUp />}></Route>
					<Route path="/profile" element={<Profile />}></Route>
					<Route
						path="/create-listing"
						element={<CreateListing />}
					></Route>
					<Route
						path="/forgot-password"
						element={<ForgotPassword />}
					></Route>
					<Route
						path="/category/:categoryName/:listingId"
						element={<Listing />}
					></Route>
					<Route
						path="/contact/:landlordId"
						element={<Contact />}
					></Route>
					<Route
						path="/edit-listing/:listingId"
						element={<EditListing />}
					></Route>
				</Routes>
				<Navbar />
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
