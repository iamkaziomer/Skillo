import React from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

const App = () => {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
    </>
  )
}

export default App