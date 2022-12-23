import "./register.css";

export default function Register() {
    return (
        <div className="login">
            <div className="loginWarapper">
                <div className="loginLeft">
                    <h4 className="loginLogo">facebook</h4>
                    <span className="loginDesc">Facebook helps you connect and share with the people in your life.</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Uder Name" className="loginInput" />
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <input placeholder="Passwor Again" className="loginInput" />
                        <button className="loginButton">Sign Up</button>
                        <hr className="LogingHr"></hr>
                        <button className="loginRegisterButton">Log into Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
