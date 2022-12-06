import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
	updateDoc,
	doc,
	collection,
	getDocs,
	query,
	where,
	orderBy,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";

function Profile() {
	const auth = getAuth();
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);
	const [changeDetails, setChangeDetails] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserListings = async () => {
			const listingsRef = collection(db, "listings");

			const q = query(
				listingsRef,
				where("userRef", "==", auth.currentUser.uid),
				orderBy("timestamp", "desc")
			);

			const querySnap = await getDocs(q);

			let listings = [];

			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			setListings(listings);
			setLoading(false);
		};

		fetchUserListings();
	}, [auth.currentUser.uid]);

	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// Update display name in fb
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				// Update in firestore
				const userRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userRef, {
					name,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Could not update profile details");
		}
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onDelete = async (listingId) => {
		if (window.confirm("Are you sure you want to delete?")) {
			await deleteDoc(doc(db, "listings", listingId));
			const updatedListings = listings.filter(
				(listing) => listing.id !== listingId
			);
			setListings(updatedListings);
			toast.success("Successfully deleted listing");
		}
	};

	const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

	return (
		<div className="p-10 mb-16 max-w-5xl mx-auto">
			<header className="flex items-center">
				<p className="text-3xl font-bold mr-3">My Profile</p>
				<button type="button" className="btn btn-xs" onClick={onLogout}>
					Logout
				</button>
			</header>

			<main>
				<div className="mt-10 mb-5 flex items-center">
					<p className=" font-bold text-xl mr-3">Personal Details</p>
					<p
						className="changePersonalDetails"
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails((prevState) => !prevState);
						}}
					>
						{changeDetails ? "done" : "Edit"}
					</p>
				</div>

				<div className="profileCard">
					<form>
						<input
							type="text"
							id="name"
							className={
								!changeDetails
									? "profileName"
									: "profileNameActive"
							}
							disabled={!changeDetails}
							value={name}
							onChange={onChange}
						/>
						<input
							type="email"
							id="email"
							className={
								!changeDetails
									? "profileEmail"
									: "profileEmailActive"
							}
							disabled={!changeDetails}
							value={email}
							onChange={onChange}
						/>
					</form>
				</div>

				{!loading && listings?.length > 0 && (
					<>
						<div className="flex justify-between mt-10 mb-5 ">
							<p className="font-bold text-xl">My Listings</p>
							<Link to="/create-listing">
								<button className="btn btn-sm">
									Add listing
								</button>
							</Link>
						</div>
						<ul className="listingsList">
							{listings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
									onDelete={() => onDelete(listing.id)}
									onEdit={() => onEdit(listing.id)}
								/>
							))}
						</ul>
					</>
				)}
			</main>
		</div>
	);
}

export default Profile;
