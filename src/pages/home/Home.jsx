import React, { useEffect, useState } from 'react'
import { BiComment } from 'react-icons/bi'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { AiOutlineEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate()
  
useEffect(() => {
  const date = new Date()
  const a = date.toLocaleString('default', {weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'})
  document.querySelector('.todaysDate').textContent = a
}, [])
// {todo.createdAt.split('').splice(0, 10).join('')}
  return (
    <div className='min-h-[100vh]'>
    <div className="flex justify-between items-center mt-[4rem] pt-10 py-5 px-10">
      <p className='text-2xl'>Blogs</p>
      <p className='todaysDate'></p>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10'>
        <div className="card shadow-xl bg-gray-950 text-white cursor-pointer">
        <div className="flex justify-between items-center pt-5 px-6">
           <p className=''>April 20 2023</p>
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
           <h2 className="card-title">Continuous Integration and Deployment </h2>
           <p>Understand the concepts of CI/CD specifically tailored for frontend development. Discover how automated testing, version control, and deployment pipelines streamline workflows and ensure robust frontend applications.</p>
         </div>
         </div>
       
       <div className="card bg-gray-950 text-white shadow-xl">
       <div className="flex justify-between items-center pt-5 px-6">
          <p className=''>July 1, 2023</p>
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
          <h2 className="card-title">Improving Frontend Performance.</h2>
          <p>Explore actionable techniques and tools to optimize frontend performance. Learn about code splitting, lazy loading, image optimization, and other practices to enhance website speed and user experience.</p>
        </div>
        </div>
       <div className="card bg-gray-950 text-white shadow-xl">
       <div className="flex justify-between items-center pt-5 px-6">
          <p className=''>July 22, 2023</p>
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
          <h2 className="card-title">Designing for User Delight: Principles of Intuitive UI/UX.</h2>
          <p>Dive into the fundamental principles of UI/UX design that prioritize user delight. Explore concepts like usability, accessibility, and emotional design to create intuitive and engaging user interfaces.</p>
        </div>
        </div>
       <div className="card bg-gray-950 text-white shadow-xl">
       <div className="flex justify-between items-center pt-5 px-6">
          <p className=''>November 15, 2023</p>
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
          <h2 className="card-title">Frontend Framework Showdown.</h2>
          <p>Compare and contrast popular frontend frameworks: React, Vue, and Angular. Explore their strengths, weaknesses, use cases, performance, and community support to aid in selecting the right framework for your projects.</p>
        </div>
        </div>
       <div className="card bg-gray-950 text-white shadow-xl">
       <div className="flex justify-between items-center pt-5 px-6">
          <p className=''>November 29, 2023</p>
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
          <h2 className="card-title">DevOps Culture.</h2>
          <p>Delve into the cultural aspects of DevOps beyond tools and processes. Discuss the importance of collaboration, communication, and automation in creating a DevOps culture that enhances productivity and software quality.</p>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Home