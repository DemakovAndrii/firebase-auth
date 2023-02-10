import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "./firebase-config";

export default function App() {
	const countryCode = "+380";

	const [phoneNumber, setPhoneNumber] = useState(countryCode);
	const [expandForm, setExpandForm] = useState(false);
	const [OTP, setOTP] = useState("");

	const generateRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			"recaptha-container",
			{
				size: "invisible",
				callback: (response) => {
					console.log(response);
				},
			},
			authentication
		);
	};

	const reqestOTP = (e) => {
		e.preventDefault();
		if (phoneNumber.length >= 12) {
			setExpandForm(true);
			generateRecaptcha();
			let appVerifire = window.recaptchaVerifier;
			signInWithPhoneNumber(authentication, phoneNumber, appVerifire)
				.then((confirmationResult) => {
					window.confirmationResult = confirmationResult;
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const verifyOTP = (e) => {
		let otp = e.target.value;
		setOTP(otp);

		if (otp.length === 6) {
			let confirmationResult = window.confirmationResult;
			confirmationResult
				.confirm(otp)
				.then((result) => {
					// User signed in successfully.
					const user = result.user;
					console.log(user);
				})
				.catch((error) => {
					// User couldn't sign in (bad verification code?)
					console.log(error);
				});
		}
	};

	return (
		<form onSubmit={reqestOTP}>
			<div>sign in phone number</div>
			<input
				type="text"
				placeholder="phone num"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
			/>
			{expandForm === true ? (
				<div>
					<div>enter pin in phone</div>
					<input
						type="text"
						placeholder="otp"
						value={OTP}
						onChange={verifyOTP}
					/>
				</div>
			) : (
				<button>reqest OTP</button>
			)}
			<div id="recaptha-container"></div>
		</form>
	);
}
