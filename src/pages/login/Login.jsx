import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = ({baseURL}) => {
  const passwordRegEx = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const userInfo = JSON.parse(localStorage.getItem('user'))
  useEffect(() =>{
    if(!userInfo) {
      navigate('/login')
      console.log(userInfo);
    }
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name] : value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {}
        if(!formData.password){
          validationErrors.password = 'Password is required'
        } else if (!passwordRegEx.test(password.value)) {
          validationErrors.password = 'Password must be alphanumeric, have at least 8 characters and a special character'
        }
        
        setErrors(validationErrors)
        
        if(Object.keys(validationErrors).length === 0) {
          setLoading(true)
          // console.log(JSON.stringify({email: formData.email, password: formData.password}))
          const response = await fetch(`${baseURL}/login`, {
            method: 'POST',
            body: JSON.stringify({email: formData.email, password: formData.password}), //data in JSON is a key and value pair
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json()
          if(response) setLoading(false)
          if(!response.ok) validationErrors.password = data.message
          if(response.ok) {
            localStorage.setItem('user', JSON.stringify(data))
            navigate('/')
          }
          console.log(response, data);
  }

}

  
    return (
      <div className='bg-gray-300 h-[100vh]'>
          <form onSubmit={handleSubmit} className='bg-gray-950 text-white absolute left-[50%] top-[50%] md:top-[50%] -translate-x-[50%] -translate-y-[50%] p-10 rounded flex justify-center flex-col sm:w-[65%] md:w-[50%] xl:w-[40%]'>
              <label htmlFor="email">Email</label>
              <input type="email" onChange={handleChange} name="email" id="email" className='text-white md:text-black p-2 rounded block mt-3 mb-5 border-gray-300' placeholder='username'/>
              {errors.email && <span className='text-red-800'>{errors.email}</span>}
              <label htmlFor="password">Password</label>
              <input type="password" onChange={handleChange} name="password" id="password" className='text-white md:text-black p-2 rounded block mt-3 border-gray-300' placeholder='********'/>
              {errors.password && <span className='text-red-800'>{errors.password}</span>}
              {loading ? <div className='loader btn glass text-white m-3 mt-5'><i class="fa-solid fa-spinner fa-spin"></i> </div> : <button type="submit" className='btn glass text-white m-3 mt-5'>Login</button>}
              <p className='text-white text-center'>Not logged in? <a href="/signup" className='text-blue-200 underline'>Signup</a></p>
          </form>
      </div>
    )
}

export default Login