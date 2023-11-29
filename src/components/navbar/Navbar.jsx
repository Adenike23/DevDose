import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi'


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [toggle, setToggle] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    
   const toggleMobileMenu = () => {
   setIsMobileMenuOpen(!isMobileMenuOpen);
   };
   const handleToggle= () => {
    // alert('hey')
    setToggle(!toggle)
  }
  const handleLogout = () => {
    setToggle(!toggle)
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <>
        <nav className="nav bg-gray-950 py-4 fixed top-0 w-[100%] z-10 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="#" onClick={() => navigate('/')} className="logo text-white text-2xl font-bold">DevDose</a>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-4">
          <a href="" onClick={() => navigate('/')} className='text-white'>Home</a>
          <a href='' onClick={() => navigate('/about')} className='me-3 text-white'>About us</a>
          {userInfo ? <FiUser onClick={handleToggle} className='text-white text-2xl cursor-pointer'/> : <button onClick={() => navigate('/login')} className='btn'>Login</button>}
        </div>
        
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className='mx-auto flex gap-5 justify-center items-center'>
        <a href="" onClick={() => navigate('/')} className="block py-2 text-white text-center">Home</a>
            <button onClick={() => navigate('/about')} className='text-white cursor-pointer'>About us</button>
            {userInfo ? <FiUser onClick={handleToggle} className='text-white text-2xl cursor-pointer'/> : <button onClick={() => navigate('/login')} className='btn mt-3'>Login</button>}
        </div>
      </div>

      {toggle && <div>
          <div class="bg-slate-100 absolute top-12 right-2 rounded p-4">
              <div onClick={()=> {navigate('/')
              setToggle(!toggle)}} class="modalTop flex items-center gap-2 cursor-pointer">
                  <FiUser className='border rounded-full p-2 text-4xl'/>
                      <div class="modalIcon p-1">
                          <p>Welcome</p>
                          <h5 class="modalUser"></h5>
                      </div>
              </div>
              <div onClick={() => {navigate('/dashboard')
              setToggle(!toggle)}} className="flex justify-around items-center mt-1 mb-2 ps-2 cursor-pointer">
                <i class="ri-dashboard-fill"></i>
                <p className='text-center text-sm ml-6'>Dashboard</p>
              </div>
              <div class="flex justify-around items-center border-t-2 mt-2 border-t-black cursor-pointer">
                  <i class="ri-logout-box-line"></i>
                  <button onClick={handleLogout} className='ps-4'>Logout</button>
              </div>
          </div>
        </div>}
      
    </nav>
    </>
  )
}

export default Navbar