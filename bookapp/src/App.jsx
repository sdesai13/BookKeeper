import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./Routes/Home/home"
import About from "./Routes/About/about"
import Header from "./components/header"
import Footer from "./components/footer"
import Books from "./Routes/Books/books"

function App() {
 

  return (
    
    <Router>
     <Header/>
      <Routes>

      <Route path ="/" element = {<Home/>}/>
      <Route path ="/about" element = {<About/>}/>
      <Route path ="/books" element = {<Books/>}/>

      </Routes>

      <Footer/>


    </Router>
    
    
  )
}

export default App