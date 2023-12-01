import React, { useEffect, useState } from 'react'
import { BiComment } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'

const BlogDetails = ({baseURL}) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(id);

  const getABlog   = async () => {
    setLoading(true)
    const response = await fetch(`${baseURL}/tasks/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json'
  }
})
    const data = await response.json()
    if(response.ok) {
      setBlogs(data)
      }
  if(response) setLoading(false)
  console.log(blogs);
}
useEffect(()=>{
getABlog()
}, [])

  return (
    <div className='bg-gray-300 min-h-[100vh] pt-[7rem]'>
        <button onClick={() => navigate('/dashboard')} className='btn bg-slate-950 m-3 text-white'>Back</button>
          {/* {blogs.map(blog => ( */}
        <div className="card shadow-xl max-w-2xl bg-gray-950 text-white absolute left-[50%] top-[55%] md:top-[55%] -translate-x-[50%] -translate-y-[50%]">
          {loading && <div className='flex justify-center items-center pt-4 text-white m-3 w-[100%]'><i class="fa-solid fa-spinner fa-spin"></i></div>}
            <div className="flex justify-between items-center pt-5 px-6">
              <p className=''>{blogs.createdAt}</p>
              <div className="flex items-center">
                {/* <div className='flex items-center me-2'>
                  <BiComment/>
                  <p>2</p>
                </div>
                <div className='flex items-center'>
                  <AiOutlineEye/>
                  <p>23</p>
                </div> */}
              </div>
              </div>
              <div className="card-body">
              <h2 className="card-title">{blogs.title}</h2>
              <p className='relative'>{blogs.description}</p>
            </div>
        </div>
          {/* ))} */}
       
        {/* <button className='btn bg-red-500 text-white m-3 mt-6 absolute bottom-[10rem] left-[23rem]'>Delete Post</button> */}
    </div>
  )
}

export default BlogDetails