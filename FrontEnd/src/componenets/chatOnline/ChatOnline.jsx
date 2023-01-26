import "./chatonline.css"

export default function ChatOnline() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img
                    src={PF + "person/amita.jpg"}
                    className="chatOnlineImg"
                />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineFriendname">Amita</span>
        </div>
    )
}
