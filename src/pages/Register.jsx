import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/LoginImg.svg";
import LoadingScreen from "../components/LoadingScreen";
import { registerUser } from "../service/userService";
import { selectUserStatus } from "../selectors/userSelectors";

import "./Login.scss";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const userStatus = useSelector(selectUserStatus);
    const isLoading = userStatus === "loading";

    const handleRegister = async (e) => {
        e.preventDefault();
        if (username.length === 0) {
            setError("Username cannot be empty!");
            return;
        }
        if (password.length === 0) {
            setError("Password cannot be empty!");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        await dispatch(registerUser({ username, password }));

        if (userStatus === "succeeded") {
            navigate("/home");
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    return isLoading ? (
        <LoadingScreen />
    ) : (
        <div className="login-page">
            <img src={LoginImg} alt="Login" className="header-image" />

            <div className="login-form">
                <div className="welcome-title">Journey Begins!</div>
                <div className="tagline">
                    Our Journey to wellbeing begins here
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="login-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    className="login-button"
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                    Let's Begin
                </button>
            </div>
            <div className="register-text">
                Already a user?{" "}
                <span onClick={goToLogin} className="register-link">
                    Login
                </span>{" "}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Register;
