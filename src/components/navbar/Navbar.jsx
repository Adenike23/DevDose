import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi';


const Navbar = ({baseURL, formData}) => {
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
    localStorage.clear()
    location.reload()
  }

  const change = async () => {
    const response = await fetch(`${baseURL}/update-profile/:id`, {
      method: 'POST',
            body: JSON.stringify({username: formData.username, password: formData.password, new_password: formData.new_password}), //data in JSON is a key and value pair
            headers: {
              'Content-Type': 'application/json'
            }
    })
    const data = await response.json()
    console.log(response, data);
  }
  return (
    <>
        <nav className="nav bg-gray-950 py-4 fixed top-0 w-[100%] z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="#" className="logo text-white text-2xl font-bold">DevDose</a>
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
        <a href="" onClick={() => navigate('/')} className="block py-2 text-white text-center">Home</a>
        <div className='w-[30%] mx-auto'>
            <button onClick={() => navigate('/about')} className='btn me-3'>About us</button>
            <button onClick={() => navigate('/login')} className='btn mt-3'>Login</button>
        </div>
      </div>

      {toggle && <div>
          <div class="modalBody bg-slate-100 absolute top-12 right-12 rounded p-4">
              <div class="modalTop flex items-center gap-2">
                  <FiUser className='border rounded-full p-2 text-4xl'/>
                      <div class="modalIcon p-1">
                          <p>Welcome</p>
                          <h5 class="modalUser"></h5>
                      </div>
              </div>
              <p onClick={change} className='text-center text-sm'>Change Password</p>
              <div class="flex gap-2 items-center ps-5">
                  <BiLogOut/>
                  <button onClick={handleLogout}>Logout</button>
              </div>
          </div>
        </div>}
      
    </nav>
    </>
  )
}

export default Navbar