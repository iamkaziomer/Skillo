import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mode, setMode] = useState('Register')

  const [name, setName] = useState('')
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5200/api/user/login', {
        email,
        password
      })
      const data = response.data
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        console.error("Login failed or token missing");
      }
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  const handleRegister = async (name,email,password,branch,semester) => {
    try {
      const response = await axios.post('http://localhost:5200/api/user/register', {
        name:name,
        email:email,
        password:password,
        branch:branch,
        semester:semester
      })
      console.log(response.data, "registered successfully")
      setMode('Login')
      setName('')
      setBranch('')
      setSemester('')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Error registering:', error)
    }
  }

  const handleModeSwitch = () => {
    if (mode === 'Login') {
      setMode('Register')
    } else {
      setMode('Login')
    }
  }

  return (
    <div className='m-auto mt-24 w-full max-w-sm px-6 py-8 bg-white rounded-2xl shadow-lg flex flex-col gap-6 border border-2-[#252525]'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>Skillo</h1>
        <p className='text-gray-500 mt-2 text-sm'>
          {mode === 'Login' ? 'Sign in to your account' : 'Register with email & password'}
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        {mode === 'Register' && (
          <>
            <div>
              <label className='text-sm text-gray-700'>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                placeholder='Your full name'
                className='mt-1 w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>
            <div>
      <label className='text-sm text-gray-700'>Branch</label>
      <select
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className='mt-1 w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
      >
        <option value="">Select Branch</option>
        <option value="CSE">CSE</option>
        <option value="AIML">AIML</option>
        <option value="Civil">Civil</option>
        <option value="CSE-AI">CSE-AI</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="Mechanical">Mechanical</option>
        <option value="IT">IT</option>
        <option value="Data Science">Data Science</option>
        <option value="Others">Others</option>
      </select>
    </div>
    <div>
      <label className='text-sm text-gray-700'>Semester</label>
      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        className='mt-1 w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
      >
        <option value="">Select Semester</option>
        <option value="I">I</option>
        <option value="II">II</option>
        <option value="III">III</option>
        <option value="IV">IV</option>
        <option value="V">V</option>
        <option value="VI">VI</option>
        <option value="VII">VII</option>
        <option value="VIII">VIII</option>
      </select>
    </div>
          </>
        )}

        <div>
          <label className='text-sm text-gray-700'>Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='you@example.com'
            className='mt-1 w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        <div>
          <label className='text-sm text-gray-700'>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='••••••••'
            className='mt-1 w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>

        <button
          onClick={() => {
            if (mode === 'Login') {
              handleLogin(email, password)
            } else {
              handleRegister(name, email, password, branch, semester)
            }
          }}
          className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition'
        >
          {mode === 'Login' ? 'Sign In' : 'Register'}
        </button>
      </div>

      <a
        onClick={handleModeSwitch}
        href='#'
        className='text-sm text-center text-blue-600 hover:underline'
      >
        {mode === 'Login' ? 'Register' : 'Login'}
      </a>
    </div>
  )
}

export default Login
