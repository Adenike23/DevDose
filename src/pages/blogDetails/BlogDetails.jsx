import React from 'react'
import { BiComment } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
import { useParams } from 'react-router-dom'

const BlogDetails = ({baseURL}) => {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const {id} = useParams()
  console.log(id);

  const deleteBlog   = async () => {
    const response = await fetch(`${baseURL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {Authorization: `Bearer ${userInfo.token}`}
})
  console.log(response);
    const data = await response.json()
    if(response.ok) {
        // setTodos(data.todos)
      }
  if(response) setLoading(false)
    console.log(data);
}
// console.log(todos);
  return (
    <div className='bg-gray-300 min-h-[100vh] pt-[7rem]'>
        <button className='btn glass m-3'>Back</button>
        <div className="card shadow-xl bg-gray-950 text-white absolute left-[50%] top-[55%] md:top-[55%] -translate-x-[50%] -translate-y-[50%]">
       <div className="flex justify-between items-center pt-5 px-6">
          <p className=''>Apr 1, 2020</p>
          <div className="flex items-center">
            <div className='flex items-center me-2'>
              <BiComment/>
              <p>2</p>
            </div>
            <div className='flex items-center'>
              <AiOutlineEye/>
              <p>23</p>
            </div>
          </div>
       </div>
        <div className="card-body">
          <h2 className="card-title">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h2>
          <p className='relative'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro at ipsum rerum ut non officiis, sint, aut temporibus expedita fugiat, aliquid corrupti itaque quas! Officia saepe ut molest...</p>
        </div>
        </div>
        <button onClick={deleteBlog} className='btn bg-red-500 text-white m-3 mt-6 absolute bottom-[10rem] left-[23rem]'>Delete Post</button>
    </div>
  )
}

export default BlogDetails