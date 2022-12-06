import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Listing() {
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const params = useParams();
	const auth = getAuth();

	useEffect(() => {
		const fetchListing = async () => {
			const docRef = doc(db, "listings", params.listingId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setListing(docSnap.data());
				setLoading(false);
			}
		};

		fetchListing();
	}, [navigate, params.listingId]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<main>
			<Swiper pagination={{ clickable: true }}>
				{listing.imgUrls.map((url, index) => (
					<SwiperSlide key={index}>
						<div
							style={{
								background: `url(${listing.imgUrls[index]}) no-repeat`,
								height: "100%",
								backgroundSize: "cover",
								backgroundPosition: "center center",
							}}
						></div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Swiper not working on </React.StrictMode> */}

			<div className="p-10 mb-16 max-w-5xl mx-auto">
				<p className="font-bold text-xl">
					{listing.name} - $
					{listing.offer
						? listing.discountedPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						: listing.regularPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				</p>
				<p className="listingLocation">{listing.location}</p>
				<p className="listingType">
					For {listing.type === "rent" ? "Rent" : "Sale"}
				</p>
				{listing.offer && (
					<p className="discountPrice">
						${listing.regularPrice - listing.discountedPrice}{" "}
						discount
					</p>
				)}

				<ul className="listingDetailsList">
					<li>
						{listing.bedrooms > 1
							? `${listing.bedrooms} Bedrooms`
							: "1 Bedroom"}
					</li>
					<li>
						{listing.bathrooms > 1
							? `${listing.bathrooms} Bathrooms`
							: "1 Bathroom"}
					</li>
					<li>{listing.parking && "Parking Spot"}</li>
					<li>{listing.furnished && "Furnished"}</li>
				</ul>

				{/* Contact landlord */}
				{auth.currentUser?.uid !== listing.userRef && (
					<Link
						to={`/contact/${listing.userRef}?listingName=${listing.name}`}
						className="btn my-5"
					>
						Contact Landlord
					</Link>
				)}
			</div>
		</main>
	);
}

export default Listing;
