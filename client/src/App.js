import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './views/Home/Home'
import Signup from './views/Signup/Signup'
import Login from './views/Login/Login'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App