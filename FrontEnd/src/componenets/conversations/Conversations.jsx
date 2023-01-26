import './conversations.css'

export default function Conversations() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="conversations">
            <img src={PF + "person/amita.jpg"}  className="conversationsImg"/>
            <span className="conversationsName">Amita</span>
        </div>
    )
}
