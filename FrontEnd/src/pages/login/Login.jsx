import { useRef, useContext } from "react";
import "./login.css";
import { LoginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";


export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        LoginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }
    console.log(user);
    return (
        <div className="login">
            <div className="loginWarapper">
                <div className="loginLeft">
                    <h4 className="loginLogo">facebook</h4>
                    <span className="loginDesc">Facebook helps you connect and share with the people in your life.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                        <input
                            placeholder="Password"
                            type="password"
                            required
                            className="loginInput"
                            ref={password}
                            minLength="6"
                        />
                        <button className="loginButton">{isFetching ? <CircularProgress color="white" size="30px"/> : 'Log In'}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <hr className="LogingHr"></hr>
                        <button className="loginRegisterButton" onClick="/register">Create a New Account</button>
                    </form>
                    <span className="celebrityPage"><a>Create a Page</a> for a celebrity, brand or business.</span>
                </div>
            </div>
        </div>
    )
}
