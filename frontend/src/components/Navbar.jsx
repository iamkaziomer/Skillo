import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import useEffect from 'react'



const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const token = localStorage.getItem('token')

  const handleRedirect = (address)=>{
    navigate(`/${address}`)
  }


  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 z-50">
      <div className='text-2xl font-bold tracking-tight text-gray-800 cursor-pointer' onClick={() => navigate('/')}>Skillo</div>

      {/* Desktop Links */}
      <div className='hidden md:flex gap-6 text-sm font-medium text-gray-700'>
        <a className='hover:text-black transition cursor-pointer' onClick={() => navigate('/')}>Home</a>
        {!token && <a className='hover:text-black transition cursor-pointer' onClick={() => navigate('/login')}>Login</a>}
        {token && <a className='hover:text-black transition cursor-pointer' onClick={() => navigate('/dashboard')}>Dashboard</a>}
        <a className='hover:text-black transition cursor-pointer' onClick={() => navigate('/about')}>About</a>
      </div>

      {/* Hamburger */}
      <button className='md:hidden p-2 rounded-md text-gray-700' onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setIsOpen(false)}>
          <div
            className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white shadow-xl p-6 space-y-6 flex flex-col 
                       transition-all duration-300 ease-in-out transform translate-x-0 rounded-l-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-gray-800">Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <a className='text-gray-700 hover:text-black text-base cursor-pointer ' onClick={() => navigate('/')} >Home</a>
            <a className='text-gray-700 hover:text-black text-base' onClick={() => navigate('/login')}>Login</a>
            <a className='text-gray-700 hover:text-black text-base' onClick={() => navigate('/dashboard')}>Dashboard</a>
            <a className='text-gray-700 hover:text-black text-base'onClick={()=>navigate('/about')}>About</a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
