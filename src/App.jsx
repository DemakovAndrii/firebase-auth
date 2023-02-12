import React, { useEffect, useState } from "react";
import "./styles.css";
import MobNumAuth from "./componenst/MobNumAuth/MobNumAuth";
import GoogleAuth from "./componenst/GoogleAuth/GoogleAuth";

export default function App() {
	const [userLogin, setUserLogin] = useState(null);

	useEffect(() => {
		const key = localStorage.getItem("key");
		if (key !== null) {
			setUserLogin(JSON.parse(key));
		}
	}, []);

	// console.log(userLogin.email);

	if (userLogin !== null) {
		if (userLogin.email) {
			return (
				<div className="container">
					<label className="loginTitle">You login with google log</label>
					<div className="emailLogContainer">
						<img src={userLogin.photoURL} alt="photo" />
						<div className="emailLogTextInfo">
							<span>{userLogin.displayName}</span>
							<span>{userLogin.email}</span>
						</div>
					</div>
					<button onClick={() => setUserLogin(null)}>Log out</button>
				</div>
			);
		} else {
			return (
				<div className="container">
					<div className="phoneLogContainer">
						<label className="loginTitle">You login with your phone</label>
						<label className="loginTitle">{userLogin.phoneNumber}</label>
					</div>
					<button onClick={() => setUserLogin(null)}>Log out</button>
				</div>
			);
		}
	}

	return (
		<div className="container">
			<MobNumAuth setUserLogin={setUserLogin} />
			<GoogleAuth setUserLogin={setUserLogin} />
		</div>
	);
}
