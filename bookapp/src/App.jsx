import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Routes/Home/home";
import About from "./Routes/About/about";
import Header from "./components/header";
import Footer from "./components/footer";
import Books from "./Routes/Books/books";
import SingleBook from "./Routes/Books/singleBook";
import CreateBook from "./Routes/Books/createBook";
import EditBook from "./Routes/Books/editBook";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  // state to manage the dark mode
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  // function to toggle the dark mode as true or false
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  // create a darkTheme function to handle dark theme using createTheme
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
      // add other properties here…
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:slug" element={<SingleBook />} />
            <Route path="/createBooks" element={<CreateBook />} />
            <Route path="/editbook/:slug" element={<EditBook />} />
          </Routes>

          <h4>Dark mode</h4>
          <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
