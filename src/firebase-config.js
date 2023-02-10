import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCMs2oQzxdQHpiBjeg9OShjhLT_u44TEYU",
	authDomain: "phome-auth-27dde.firebaseapp.com",
	projectId: "phome-auth-27dde",
	storageBucket: "phome-auth-27dde.appspot.com",
	messagingSenderId: "106907950201",
	appId: "1:106907950201:web:6875eb38daec723ca088a8",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)
