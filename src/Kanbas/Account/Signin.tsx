
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
// import * as db from "../Database";
import * as client from "./client";

export default function Signin() {
	const [credentials, setCredentials] = useState<any>({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const signin = async () => {
		try {
			const user = await client.signin(credentials);
			if (!user) return;
			dispatch(setCurrentUser(user));
			navigate("/Kanbas/Dashboard");
		} catch (error) {
			console.error('Signin error:', error);
    		window.alert('Invalid username or password');
		}
	};

	return (
		<div id="wd-signin-screen">
			<h3>Sign in</h3>
			<input defaultValue={credentials.username}
				onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
				id="wd-username" placeholder="username"
				className="form-control mb-2" />
			<input defaultValue={credentials.password}
				onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
				id="wd-password" placeholder="password" type="password"
				className="form-control mb-2" />

			<button onClick={signin} id="wd-signin-btn"
				className="btn btn-primary w-100"> Sign in </button>
			<Link id="wd-signup-link" to="/Kanbas/Account/Signup" className="mt-3">Sign up</Link>

		</div>
	)
}

