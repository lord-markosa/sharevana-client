import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/LoginImg.svg";
import LoadingScreen from "../components/LoadingScreen";
import { loginUser } from "../service/userService";
import { selectUserStatus } from "../selectors/userSelectors";

import "./Login.scss";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const userStatus = useSelector(selectUserStatus);
    const isLoading = userStatus === "loading";

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username.length == 0) {
            setError("Username cannot be empty!");
            return;
        }
        if (password.length == 0) {
            setError("Password cannot be empty!");
            return;
        }

        await dispatch(loginUser({ username, password }));

        if (userStatus === "succeeded") {
            navigate("/home");
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return isLoading ? (
        <LoadingScreen />
    ) : (
        <div className="login-page">
            <img src={LoginImg} alt="Login" className="header-image" />

            <div className="login-form">
                <div className="welcome-title">Welcome Back!</div>
                <div className="tagline">
                    Our Journey to wellbeing continues here
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
                <button
                    className="login-button"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    Let's Begin
                </button>
            </div>
            <div className="register-text">
                New here?{" "}
                <span onClick={goToRegister} className="register-link">
                    Register
                </span>{" "}
                now
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Login;
