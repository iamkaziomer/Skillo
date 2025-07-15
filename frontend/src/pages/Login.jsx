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
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/login`, {
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

  const handleRegister = async (name,email,password,branch,semester,linkedinUrl,githubUrl) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/register`, {
        name:name,
        email:email,
        password:password,
        branch:branch,
        semester:semester,
        linkedinUrl:linkedinUrl,
        githubUrl:githubUrl
      })
      console.log(response.data, "registered successfully")
      setMode('Login')
      setName('')
      setBranch('')
      setSemester('')
      setEmail('')
      setPassword('')
      setLinkedinUrl('')
      setGithubUrl('')
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
    <div className='m-auto mt-24 w-full max-w-md px-6 py-8 bg-white rounded-2xl shadow-xl flex flex-col gap-6 border border-gray-200'>
      <div className='text-center'>
        <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl font-bold text-white'>S</span>
        </div>
        <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>Welcome to Skillo</h1>
        <p className='text-gray-500 mt-2 text-sm'>
          {mode === 'Login' ? 'Sign in to your account' : 'Register with email & password'}
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        {mode === 'Register' && (
          <>
            <div>
              <label className='text-sm font-medium text-gray-700'>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                placeholder='Your full name'
                className='mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
              />
            </div>
            <div>
      <label className='text-sm font-medium text-gray-700'>Branch</label>
      <select
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className='mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
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
      <label className='text-sm font-medium text-gray-700'>Semester</label>
      <select
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        className='mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
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
            <div>
              <label className='text-sm font-medium text-gray-700'>LinkedIn URL (Optional)</label>
              <input
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                type='url'
                placeholder='https://linkedin.com/in/yourprofile'
                className='mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
              />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700'>GitHub URL (Optional)</label>
              <input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                type='url'
                placeholder='https://github.com/yourusername'
                className='mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
              />
            </div>
          </>
        )}

        <div>
          <label className='text-sm font-medium text-gray-700'>Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='you@example.com'
            className='mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
          />
        </div>

        <div>
          <label className='text-sm font-medium text-gray-700'>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='••••••••'
            className='mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
          />
        </div>

        <button
          onClick={() => {
            if (mode === 'Login') {
              handleLogin(email, password)
            } else {
              handleRegister(name, email, password, branch, semester, linkedinUrl, githubUrl)
            }
          }}
          className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl'
        >
          {mode === 'Login' ? 'Sign In' : 'Register'}
        </button>
      </div>

      <a
        onClick={handleModeSwitch}
        href='#'
        className='text-sm text-center text-blue-600 hover:text-blue-700 hover:underline transition'
      >
        {mode === 'Login' ? 'Register' : 'Login'}
      </a>
    </div>
  )
}

export default Login
