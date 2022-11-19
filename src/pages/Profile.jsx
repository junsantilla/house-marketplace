import React from "react";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

function Profile() {
	const [user, setUser] = useState([]);
	const auth = getAuth();

	useEffect(() => {
		console.log(auth.currentUser);
		setUser(auth.currentUser);
	}, []);

	return <>{user.displayName}</>;
}

export default Profile;
