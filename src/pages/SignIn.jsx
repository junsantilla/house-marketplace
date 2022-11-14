import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormDaata] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const navigate = useNavigate();

	const onChange = (e) => {
		setFormDaata((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>
			</div>

			<main>
				<form>
					<input
						type="email"
						className="emailInput"
						placeholder="Email"
						id="email"
						value={email}
						onChange={onChange}
					/>

					<div className="passwordInputDiv">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							className="passwordInput"
							id="password"
							value={password}
							onChange={onChange}
						/>
						<img
							src={visibilityIcon}
							alt="show password"
							className="showPassword"
							onClick={() =>
								setShowPassword((prevState) => !prevState)
							}
						/>
					</div>

					<Link to="/forgot-password" className="forgotPasswordLink">
						Forgot Password
					</Link>

					<div className="signInBar">
						<p className="signInText">Sign In</p>
						<button className="signInButton">
							<ArrowRightIcon
								fill="#fff"
								width="34px"
								height="34px"
							/>
						</button>
					</div>
				</form>

				<Link className="registerLink" to="/sign-up">
					Sign Up Instead
				</Link>
			</main>
		</>
	);
}

export default SignIn;
