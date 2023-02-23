import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './views/Signup/Signup'
import Login from './views/Login/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App