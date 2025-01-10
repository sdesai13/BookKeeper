import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
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
import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import { WbSunny, NightlightRound } from "@mui/icons-material";

function App() {
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
    },
  });

  // Styled wrapper for the switch and icon
  const ThemeToggleWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "16px 0",
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

          <ThemeToggleWrapper>
            {toggleDarkMode ? (
              <NightlightRound fontSize="small" />
            ) : (
              <WbSunny fontSize="small" />
            )}
            <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
          </ThemeToggleWrapper>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
