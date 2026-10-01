import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/home"
import Properties from "./pages/property"




function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Properties />} />
       
      </Routes>
    </BrowserRouter>
  )
}

export default App