import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true;
		}
	};

	return (
		<div className="fixed w-full bottom-0 flex justify-around text-center bg-gray-200 py-5 border">
			<div onClick={() => navigate("/")}>
				<a
					className={
						pathMatchRoute("/")
							? "navbarListItemNameActive cursor-pointer"
							: "navbarListItemName cursor-pointer"
					}
				>
					Explore
				</a>
			</div>
			<div onClick={() => navigate("/offers")}>
				<a
					className={
						pathMatchRoute("/offers")
							? "navbarListItemNameActive cursor-pointer"
							: "navbarListItemName cursor-pointer"
					}
				>
					Offers
				</a>
			</div>
			<div onClick={() => navigate("/profile")}>
				<a
					className={
						pathMatchRoute("/profile")
							? "navbarListItemNameActive cursor-pointer"
							: "navbarListItemName cursor-pointer"
					}
				>
					Profile
				</a>
			</div>
		</div>
	);
}

export default Navbar;
