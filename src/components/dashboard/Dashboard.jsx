import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import BlogDetails from '../../pages/blogDetails/BlogDetails'

const Dashboard = ({baseURL}) => {
    const [selectedTab, setSelectedTab] = useState('tab1');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [new_password, setNew_password] = useState('')
    const passwordRegEx = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    const emailRegEx = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm
    const navigate = useNavigate()
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
      };

    const userInfo = JSON.parse(localStorage.getItem('user'))
    useEffect(() =>{
    if(userInfo) {
      navigate('/dashboard')
    //   console.log(userInfo);
    } else if (!userInfo){
        navigate('/login')
    }
  }, [])

    const postBlog = async () => {
        setLoading(true)
        console.log(JSON.stringify({title, description}));
    const response = await fetch(`${baseURL}/add-todo`, {
        method: 'POST',
            body: JSON.stringify({title, description}), //data in JSON is a key and value pair
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
    })
    console.log(response);
        const data = await response.json()
        if(response)setLoading(false)
        if(response.ok) {
            alert(data.detail)
            setTimeout(() => {
                location.href = '/dashboard'
            }, 2000);
        }
        console.log(data);
        if(response.ok == false)
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 3000);
    }
    
    const getBlogs   = async () => {
        const response = await fetch(`${baseURL}/tasks`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${userInfo.token}`}
    })
        const data = await response.json()
        if(response.ok) {
            setTodos(data.todos)
          }
      if(response) setLoading(false)
    }
useEffect(()=>{
    getBlogs()
}, [])


    const updatePassword = async (e) => {
        e.preventDefault()
        
        setLoading(true)
        const response = await fetch(`${baseURL}/update-profile/${userInfo.user._id}`, {
            method: 'PUT',
            body: JSON.stringify({email, username, password, new_password}),
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(response);
        const data = await response.json()
        console.log(data);
        console.log(JSON.stringify({email, username, password, new_password}))
        if(username.length === 0 || email.length === 0 || password.length === 0 || new_password.length === 0) {
            setError(true)
            setTimeout(() => {
                setError(false)
                setLoading(false)
            }, 2000);
        } else if (!response.ok){
            alert(data.detail)
            setLoading(false)
        }
        else{
            setLoading(false)
        }
        if(response.ok) {
            alert('Your password has been updated successfully')
            setEmail('')
            setUsername('')
            setPassword('')
            setNew_password('')
        }
    }

    const deleteBlogs = async (id) => {
        setLoading(true)
    const response = await fetch(`${baseURL}/tasks/${id}`, {
        method: 'DELETE',
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
    })
    console.log(response);
        const data = await response.json()
        if(response.ok) {
            alert(data.detail)
            setLoading(false)
        }
        console.log(data);
        console.log(id);
        setTimeout(() => {
            location.reload()
        }, 2000);
    }

  return (
    <div className='h-[100vh]'>
        <div className="dashboard absolute left-[50%] top-[55%] md:top-[55%] -translate-x-[50%] -translate-y-[50%] w-[80%] h-[80vh] bg-gray-400 text-white rounded px-[2rem] md:w-auto md:px-[4rem] py-[2rem]">
            <p className='logo border-b-2 pb-3 text-2xl font-bold'>Dashboard</p>
            <div className="gap-3 justify-around flex my-6 border-b-2 pb-5 md:gap-12">
                <button className={selectedTab === 'tab1' ? 'active-tab' : 'inactive-tab'} onClick={() => handleTabClick('tab1')}>Add a Post</button>
                <button className={selectedTab === 'tab2' ? 'active-tab' : 'inactive-tab'} onClick={() => handleTabClick('tab2')}>All Posts</button>
                <button className={selectedTab === 'tab3' ? 'active-tab' : 'inactive-tab'} onClick={() => handleTabClick('tab3')}>Account Settings</button>
            </div>
            {selectedTab === 'tab1' && <div className=''>
            {error && <p className='text-red-800 bg-red-200 rounded text-sm p-1 border border-red-600 text-center'>Description of your task is reqiured</p>}
                <input type="text" name="title" id="title" className='p-2 w-[100%] mt-5 text-black rounded' placeholder='add a title' onChange={e => setTitle(e.target.value)}/>
                <textarea name="createPost" id="createPost" cols="70" rows="6" placeholder='create a post' className='rounded text-black p-2 mt-3 w-[100%]' onChange={e => setDescription(e.target.value)}></textarea>
                {loading ? <div className='loader btn glass pt-4 text-white m-3 block w-[95%]'><i class="fa-solid fa-spinner fa-spin"></i></div> :<button onClick={()=>postBlog()} className='btn glass text-white m-3 block w-[100%] mt-6'>Post</button>}
            </div>}
            {selectedTab === 'tab2' && <div className=''>
            {text && <p className='deleted text-green-800 bg-green-200 rounded text-sm p-1 border border-green-600 text-center'></p>}
                {todos.map(todo => (
                    <div className="flex justify-between items-center my-3">
                    <p onClick={() => navigate(`/blogDetails/${todo._id}`)} className='cursor-pointer'>{todo.title}</p>
                    <div className="flex gap-2">
                        <button className='btn'>Edit</button>
                        <button onClick={()=> deleteBlogs(todo._id)} className='btn bg-red-500'>Delete</button>
                    </div>
                </div>
                ))}
                {loading ? <div className='flex justify-center pt-4 text-white m-3 w-[90%]'><i class="fa-solid fa-spinner fa-spin"></i></div> : ''}
            </div>}
            {selectedTab === 'tab3' && <form onSubmit={updatePassword}>
                {error && <p className='text-red-800 bg-red-200 rounded text-sm p-1 border border-red-600 text-center'>Fields cannot be empty</p>}
                <label htmlFor="email" className=''>Email</label>
                <input type="text" name="email" id="email" className='w-[100%] text-black p-2 rounded block mt-3' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="userName" className='mt-5'>Username</label>
                <input type="text" name="username" id="userName" className='w-[100%] text-black p-2 rounded block mt-3' placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password" className='mt-5'>Password</label>
                <input type="password" name="password" id="password" className='w-[100%] text-black p-2 rounded block mt-3' placeholder='********' onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="newPassword" className='mt-5'>New Password</label>
                <input type="newPassword" name="newPassword" id="newPassword" className='w-[100%] text-black p-2 rounded block mt-3' placeholder='********' onChange={(e) => setNew_password(e.target.value)}/>
                {loading ? <div className='loader btn glass pt-4 text-white m-3 block w-[95%]'><i class="fa-solid fa-spinner fa-spin"></i></div> : <button type='submit' className='btn glass text-white m-3 block w-[95%]'>Update Password</button>}
            </form>}
        </div>
    </div>
  )
}

export default Dashboard