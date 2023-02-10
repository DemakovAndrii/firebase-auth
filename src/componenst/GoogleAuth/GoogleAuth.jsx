import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../../firebase-config";

const GoogleAuth = () => {
	const [activePopup, setActivePopup] = useState(false);

	const provider = new GoogleAuthProvider();

	const popupHandler = () => {
		setActivePopup(true);

		if (activePopup === true) {
			signInWithPopup(authentication, provider)
				.then((result) => {
					// This gives you a Google Access Token. You can use it to access the Google API.
					const credential = GoogleAuthProvider.credentialFromResult(result);
					const token = credential.accessToken;
					// console.log(token);
					const user = result.user;
					console.log(user);
				})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					// The email of the user's account used.
					const email = error.customData.email;
					// The AuthCredential type that was used.
					const credential = GoogleAuthProvider.credentialFromError(error);
					console.log(error);
				});
			// .finally(setActivePopup(false));
		}
	};

	return (
		<div>
			<button onClick={popupHandler}>log in with google acc</button>
		</div>
	);
};

export default GoogleAuth;
