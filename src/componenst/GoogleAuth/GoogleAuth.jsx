import React from "react";
import styles from "./GoogleAuth.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from "../../firebase-config";

const GoogleAuth = ({ setUserLogin }) => {
	const provider = new GoogleAuthProvider();

	const popupHandler = () => {
		signInWithPopup(authentication, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// console.log(token);
				const user = result.user;
				setUserLogin(user);
				localStorage.setItem("key", JSON.stringify(user));
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.customData.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
				console.log(error);
			});
	};

	return (
		<div className={styles.container}>
			<label className={styles.word}>or</label>
			<button onClick={popupHandler}>log in with google acc</button>
		</div>
	);
};

export default GoogleAuth;
