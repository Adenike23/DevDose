import React from 'react'
import { BsGithub, BsLinkedin, BsTwitter, BsWhatsapp } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { FaRegSmile } from 'react-icons/fa'

const About = () => {
  return (
    <div className='bg-gray-300 min-h-[100vh] text-black'>
    <div className='pt-[8rem] flex flex-col justify-center md:items-center md:pt-[12rem] mx-[5rem] pb-5'>
        <p className='text-3xl'>Welcome to <span className="logo">DevDose</span></p>
        <h1>Hey there! I'm Adenike, the voice behind this corner of the internet. With a passion for all things tech, I'm thrilled to be your guide through the ever-evolving world of technology. Armed with a keen eye for design and a love for clean, efficient code, I specialize in bringing digital visions to life. and have a passion for blogging. Here, we dive into the latest trends, share coding tips, and explore innovative breakthroughs that make our digital lives exciting..</h1>
        <p className='text-3xl mt-4'>Why <span className="logo">DevDose</span></p>
        <h1>This blog is your go-to resource for staying in the know about the tech landscape. I believe in demystifying complex concepts and aim to make technology accessible for everyone.Whether you're a coding enthusiast looking for the latest frameworks or a tech-curious individual interested in future innovations, there's something here for you.</h1>
        <div className="mt-3 gap-1 flex items-center">
          <p>Let's connect! </p>
          <FaRegSmile className='mt-1'/>
        </div>
        <h1 className='mt-5'>I love hearing from you. Share your thoughts with me on <Link to='https://www.twitter.com/Oluwaseyi_mo'><BsTwitter className='inline'/></Link> and <Link to='http://linkedin.com/in/adenike-adeofe-988661233'><BsLinkedin className='inline'/></Link> and let's journey together into the fascinating world of tech. Thanks for stopping by!</h1>
    <div className="mt-5 flex justify-center space-x-11 text-2xl">
    <Link to='https://www.github.com/adenike23'><BsGithub className='inline hover:scale-110 duration-700'/></Link>
    <Link to='https://www.twitter.com/oluwaseyi_mo'><BsTwitter className='inline hover:scale-110 duration-700'/></Link>
    <Link to='https://wa.me/+2348096605513'><BsWhatsapp className='inline hover:scale-110 duration-700'/></Link>
    </div>
    </div>
    </div>
  )
}

export default About