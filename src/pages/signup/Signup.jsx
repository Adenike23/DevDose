import React, {useState} from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar'


const Signup = ({baseURL}) => {
console.log(baseURL);
const passwordRegEx = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
const emailRegEx = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name] : value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {}
    // if(!formData.fullName.trim()){
    //   validationErrors.fullName = 'fullName is required'
    // }
    if(!formData.email.trim()){
      validationErrors.email = 'Email is required'
    } else if (!emailRegEx.test(email.value)) {
        validationErrors.email = 'Email is not valid'
    }
    if(!formData.username.trim()){
      validationErrors.username = 'Username is required'
    }
    if(!formData.password){
      validationErrors.password = 'Password is required'
    } else if (!passwordRegEx.test(password.value)) {
      validationErrors.password = 'Password must be alphanumeric, have at least 8 characters and a special character'
    }
    if(!formData.confirmPassword){
        validationErrors.confirmPassword = 'This field is required'
    }  else if(formData.confirmPassword !== formData.password) {
        validationErrors.confirmPassword = 'Both password fields must match password'
    }

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
        setLoading(true)
        console.log(JSON.stringify({username: formData.username, email: formData.email, password: formData.password}))
      const response = await fetch(`${baseURL}/signup`, {
        method: 'POST',
        body: JSON.stringify({username: formData.username, email: formData.email, password: formData.password}), //data in JSON is a key and value pair
        headers: {
            'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if(response) setLoading(false)
      if(!response.ok && data.message === 'User with this email already exist.') {
         validationErrors.email = data.message
      } else{
        validationErrors.username = data.message
      }
      if(response.ok) {
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/')
      }
      console.log(response, data);
    }

  }
  return (
    <div className='bg-gray-300 h-[100vh]'>
      <Navbar formData={formData}/>
        <form onSubmit={handleSubmit} className='bg-gray-950 text-white absolute left-[50%] top-[60%] md:top-[65%] -translate-x-[50%] -translate-y-[50%] p-10 rounded flex justify-center flex-col w-[90%] md:w-[50%] xl:w-[40%]'>
            <label htmlFor="email" className='mt-5'>Email</label>
            <input type="text" onChange={handleChange} name="email" id="email" className='border-gray-300 bg-white text-black p-2 rounded block mt-3' autoComplete='off' placeholder='email'/>
            {errors.email && <span className='text-red-800 bg-red-200 mt-1 rounded text-sm p-1 border border-red-600'>{errors.email}</span>}
            <label htmlFor="userName" className='mt-5'>Username</label>
            <input type="text" onChange={handleChange} name="username" id="userName" className='border-gray-300 bg-white text-black p-2 rounded block mt-3' autoComplete='off' placeholder='username'/>
            {errors.username && <span className='text-red-800 bg-red-200 mt-1 rounded text-sm p-1 border border-red-600'>{errors.username}</span>}
            <label htmlFor="password" className='mt-5'>Password</label>
            <input type="password" onChange={handleChange} name="password" id="password" className='border-gray-300 bg-white text-black p-2 rounded block mt-3' placeholder='********'/>
            {errors.password && <span className='text-red-800 bg-red-200 mt-1 rounded text-sm p-1 border border-red-600'>{errors.password}</span>}
            <label htmlFor="confirmPassword" className='mt-5'>ConfirmPassword</label>
            <input type="password" onChange={handleChange} name="confirmPassword" id="confirmPassword" className='border-gray-300 bg-white text-black p-2 rounded block mt-3' autoComplete='off' placeholder='confirmPassword'/>
            {errors.confirmPassword && <span className='text-red-800 bg-red-200 mt-1 rounded text-sm p-1 border border-red-600'>{errors.confirmPassword}</span>}
            {loading ? <div className='loader btn glass text-white my-7'><FaSpinner/></div> : <button type="submit" className='btn glass text-white my-7'>Sign up</button>}
        </form>
    </div>
  )
}

export default Signup