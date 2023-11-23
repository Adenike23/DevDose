import React from 'react'
import { BiComment } from 'react-icons/bi'
import { AiOutlineEye } from 'react-icons/ai'
const BlogDetails = () => {
  return (
    <div className='bg-gray-300 min-h-[100vh] pt-[7rem]'>
        <button className='btn glass m-3'>Back</button>
        <div className="card shadow-xl bg-gray-950 text-white">
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
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro at ipsum rerum ut non officiis, sint, aut temporibus expedita fugiat, aliquid corrupti itaque quas! Officia saepe ut molest...</p>
        </div>
        </div>
    </div>
  )
}

export default BlogDetails