import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Redirect,
  Navigate

} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

import Search from "./componenets/search/Search";


function App() {
  const { user } = useContext(AuthContext);
  return (<>
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={!user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />} />
        <Route path="/search" element={!user ? <Navigate to="/" /> : <Search />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  </>
  )
}

export default App;
