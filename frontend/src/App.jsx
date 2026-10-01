import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Home from "./pages/home"
import Properties from "./pages/property"
import AddProperty from "./pages/addproperty"
import Signup from "./pages/signup"




function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Properties />} />
        <Route path="/addproperty" element={<AddProperty />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App