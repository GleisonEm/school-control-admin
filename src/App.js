import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./Helpers/Theme";
import PostDetails from "./pages/PostDetails";
import Navbar from "./Components/NavBar";

function App() {
  let saveuser = localStorage.getItem("isLoggedin");
  const [isLogged, setIsLogged] = useState(saveuser);

  const signUserOut = () => {
      localStorage.clear();
      setIsLogged(false);
      window.location.pathname = "/login";
  };

  return (
    <ThemeProvider theme={themes}>
      <Router>
        <div className="App">
          {/* <Navbar isLogged={isLogged} signUserOut={signUserOut} /> */}
          <Routes>
            <Route
              path="/login"
              element={<Login setIsLogged={setIsLogged} />}
            />
            <Route path="/" exact element={isLogged ? <Home isLogged={isLogged} signUserOut={signUserOut} /> : <Login setIsLogged={setIsLogged} />} />
            <Route path="/posts" exact element={<PostDetails />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
