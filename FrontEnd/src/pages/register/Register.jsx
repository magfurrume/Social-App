import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const API_CALL = process.env.REACT_APP_BACKEND_API;
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Password Don't Match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post(API_CALL +"auth/register", user);
                navigate("/login")
            } catch (err) {
                console.log(err);
            }
        }
        // LoginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }

    return (
        <div className="login">
            <div className="loginWarapper">
                <div className="loginLeft">
                    <h4 className="loginLogo">facebook</h4>
                    <span className="loginDesc">Facebook helps you connect and share with the people in your life.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="User Name"
                            required
                            className="loginInput"
                            ref={username}
                        />
                        <input
                            placeholder="Email"
                            required
                            className="loginInput"
                            ref={email}
                            type="email"
                        />
                        <input
                            placeholder="Password"
                            required
                            className="loginInput"
                            ref={password}
                            type="password"
                            minLength="6"
                        />
                        <input
                            placeholder="Passwor Again"
                            required
                            className="loginInput"
                            ref={passwordAgain}
                            type="password"
                            minLength="6"
                        />

                        <button className="loginButton" type="submit">Sign Up</button>
                        <hr className="LogingHr"></hr>
                        <button className="loginRegisterButton">Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
