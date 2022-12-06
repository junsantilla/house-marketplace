import React from "react";
import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import Slider from "../components/Slider";

function Explore() {
	return (
		<div className="p-10 mb-16 max-w-5xl mx-auto">
			<header>
				<p className="text-3xl font-bold mb-5">Explore</p>
			</header>
			<main>
				<Slider />
				<p className="mt-10 mb-5 font-bold text-xl">Categories</p>
				<div className="exploreCategories">
					<Link to="/category/rent">
						<img
							src={rentCategoryImage}
							alt="rent"
							className="max-h-60 w-full object-cover"
						/>
						<p className="mt-4 font-bold text-sm">
							Places for rent
						</p>
					</Link>
					<Link to="/category/sale">
						<img
							src={sellCategoryImage}
							alt="sell"
							className="max-h-60 w-full object-cover"
						/>
						<p className="mt-4 font-bold text-sm">
							Places for sale
						</p>
					</Link>
				</div>
			</main>
		</div>
	);
}

export default Explore;
