import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
 //   user: null,
    user: {
        "_id": "6399825c3af78098c03830c1",
        "userName": "Ishmam",
        "email": "rume@gmail.comm",
        "profilePicture": "person/ishmam.jpg",
        "coverPicture": "cover/2.jpg",
        "followers": [
            "639982123af78098c03830bc"
        ],
        "followings": ["639982123af78098c03830bc"],
        "isAdmin": false,
        "desc": "Hello its me the Shaisab vai  "
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}