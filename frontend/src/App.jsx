import { Route, Routes } from "react-router-dom"
import Navigation from "./components/navigation/Navigation"
import About from "./pages/About"
import Experience from "./pages/Experience"
import Education from "./pages/Education"
import Skills from "./pages/Skills"
import Interests from "./pages/Interests"
import Awards from "./pages/Awards"


function App() {
  

  return (
    <>
      <div className="page-top">
        <Navigation/>
        <div className="container-fluid p-0">
          <Routes>
            <Route path="/" element={<About/>}/>
            <Route path="/experience" element={<Experience/>}/>
            <Route path="/education" element={<Education/>}/>
            <Route path="/skills" element={<Skills/>}/>
            <Route path="/interests" element={<Interests/>}/>
            <Route path="/awards" element={<Awards/>}/>
          </Routes>
        </div>
      </div>
      
    </>
  )
}

export default App
