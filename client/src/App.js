import { Home, Login, Register, Profile } from "./pages/index";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
