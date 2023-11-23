import './App.css'
import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import About from './pages/about/About'
import BlogDetails from './pages/blogDetails/BlogDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/signup/Signup'

const App = () => {

  const baseURL = 'https://mytaskz.onrender.com'

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home baseURL={baseURL}/>}/>
          <Route path='/login' element={<Login baseURL={baseURL}/>}/>
          <Route path='/about' element={<About baseURL={baseURL}/>}/>
          <Route path='/signup' element={<Signup baseURL={baseURL}/>}/>
          <Route path='/blogDetails' element={<BlogDetails baseURL={baseURL}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App