import "./login.css";

export default function Login() {
    return (
        <div className="login">
            <div className="loginWarapper">
                <div className="loginLeft">
                    <h4 className="loginLogo">facebook</h4>
                    <span className="loginDesc">Facebook helps you connect and share with the people in your life.</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <hr className="LogingHr"></hr>
                        <button className="loginRegisterButton">Create a New Account</button>
                    </div>
                    <span className="celebrityPage"><a>Create a Page</a> for a celebrity, brand or business.</span>
                </div>
            </div>
        </div>
    )
}
