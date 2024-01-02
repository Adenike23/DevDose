import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = ({baseURL}) => {
  const navigate = useNavigate()
  const[todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const userInfo = JSON.parse(localStorage.getItem('user'))
  
useEffect(() => {
  const date = new Date()
  const a = date.toLocaleString('default', {weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'})
  document.querySelector('.todaysDate').textContent = a
}, [])


const getBlogs   = async () => {
  setLoading(true)
  const response = await fetch(`${baseURL}/`, {
  method: 'GET',
  // headers: {Authorization: `Bearer ${userInfo.token}`}
})
  const data = await response.json()
  if(response.ok) {
      setTodos(data)
      setLoading(false)
    }
}
useEffect(()=>{
  getBlogs()
}, [])

  return (
    <div className='min-h-[100vh]'>
    <div className="flex justify-between items-center mt-[4rem] pt-5 px-4 md:px-10 text-black">
      <p className='text-2xl'>Blogs</p>
      <p className='todaysDate'></p>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 py-10'>
    {loading && <div className='absolute left-[48%] top-[30%] -translate-x-[50%] text-black m-3 text-5xl md:left-[50%]'><i class="fa-solid fa-spinner fa-spin"></i></div>}
        {todos && todos.map(todo => (
          <div onClick={() => navigate(`/blogDetails/${todo._id}`)} className="card shadow-xl bg-gray-950 text-white cursor-pointer hover:text-gray-400">
          <div className="flex justify-between items-center pt-5 px-6">
             <p className=''>{todo.createdAt.substring(0, 10)}</p>
          </div>
           <div className="card-body">
             <h2 className="card-title">{todo.title}</h2>
             <p>{todo.description && todo.description.length >= 100 ? todo.description.substring(0, 130) + '...' : todo.description}</p>
           </div>
           </div>
        ))}
    </div>
    </div>
  )
}

export default Home