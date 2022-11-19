import React from "react";
import { getAuth, getMultiFactorResolver, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { async } from "@firebase/util";
import { toast } from "react-toastify";

function Profile() {
	const auth = getAuth();
	const [changeDetails, setChangeDetails] = useState(false);

	const [formData, setformData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	const navigate = useNavigate();

	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				// Update displayname in firebase
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
			toast.error("Something went wrong!");
		}
	};

	const onChange = (e) => {
		setformData((prevState) => ({
			prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="profile">
			<header className="profileHeader">
				<p className="pageHeader">My Profile</p>
				<button className="logOut" type="button" onClick={onLogout}>
					Log out
				</button>
			</header>
			<div className="profileDetailsHeader">
				<p className="profileDetailsText">Personal Details</p>
				<p
					className="changePersonalDetails"
					onClick={() => {
						changeDetails && onSubmit();
						setChangeDetails((prevState) => !prevState);
					}}
				>
					{changeDetails ? "Done" : "Change"}
				</p>
			</div>
			<div className="profileCard">
				<form>
					<input
						type="text"
						id="name"
						className={
							!changeDetails ? "profileName" : "profileNameActive"
						}
						disabled={!changeDetails}
						value={name}
						onChange={onChange}
					/>
					<input
						type="text"
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
		</div>
	);
}

export default Profile;
