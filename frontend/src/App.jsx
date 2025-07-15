import React from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import UserProfile from './pages/UserProfile'

const App = () => {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile/:userId' element={<UserProfile/>}/>
    </Routes>
    </>
  )
}

export default App