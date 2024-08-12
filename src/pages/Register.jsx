import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import LoginImg from "../assets/LoginImg.svg";
import LoadingScreen from "../components/LoadingScreen";
import { registerUser } from "../service/userService";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector((state) => state.user.isLoading);

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

        dispatch(registerUser({ username, password }));
        navigate("/home");
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
                <button className="login-button" onClick={handleRegister}>
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
