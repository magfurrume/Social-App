import "./message.css";

export default function Message({ own }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img src={PF + "person/amita.jpg"} className="messageImg" />
                <p className="messagetext">In publishing and graphic design, Lorem ipsum is a placeholder </p>

            </div>
            <div className="messageBottom">
                <p className="messageTime">1 hour ago</p>
            </div>
        </div>
    )
}
