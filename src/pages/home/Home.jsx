import React from 'react'
import { BiComment } from 'react-icons/bi'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { AiOutlineEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  return (
    <div className=''>
    <div className="flex justify-between items-center mt-[4rem] pt-10 py-5 px-10">
      <p className='text-2xl'>Blogs</p>
      {userInfo && <BsFillPlusCircleFill onClick={() => navigate('/login')} className='text-3xl cursor-pointer'/>}
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10'>
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
       <div className="card bg-gray-950 text-white shadow-xl">
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
       <div className="card bg-gray-950 text-white shadow-xl">
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
       <div className="card bg-gray-950 text-white shadow-xl">
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
       <div className="card bg-gray-950 text-white shadow-xl">
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
       <div className="card bg-gray-950 text-white shadow-xl">
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
    </div>
  )
}

export default Home