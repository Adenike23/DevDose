import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate'

const Dashboard = ({baseURL}) => {
    const [selectedTab, setSelectedTab] = useState('tab1');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [text, setText] = useState('')
    const [todos, setTodos] = useState([])
    const [editModal, setEditModal] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [titleUpdate, setTitleUpdate] = useState('')
    const [descriptionUpdate, setDescriptionUpdate] = useState('')
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
    const [blogID, setBlogID] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0)
    const usersPerPage = 5;
    const pageVisited = usersPerPage * pageNumber
    const pageCount = Math.ceil(todos.length / usersPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }


    const toggleModal = async (id) => {
        setBlogID(id)
        setIsOpen(!isOpen);
        console.log('toggle =>', id);
        const response = await fetch(`${baseURL}/tasks/${id}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${userInfo.token}`}
        })
        const data = await response.json()
        console.log(response, data);
        if(response.ok) {
            setTitleUpdate(data.title)
            setDescriptionUpdate(data.description)
        }
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
        console.log(JSON.stringify({title, description}));
        if(description.length >= 200){
        setLoading(true)
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
        console.log(data);
        if(response)setLoading(false)
        if(response.ok) {
            getBlogs()
            setText(data.detail)
            setTitle('')
            setDescription('')
            setTimeout(() => {
                setText('')
            }, 2000);
        } 
    } else{
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 3000);
    }
    }

    const getBlogs   = async () => {
        // setLoading(true)
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
            setText(data.detail)
            setLoading(false)
            setTimeout(() => {
                setText('')
            }, 2000);
        }
        else{
            setLoading(false)
        }
        if(response.ok) {
            setText('Your password has been updated successfully')
            setEmail('')
            setUsername('')
            setPassword('')
            setNew_password('')

            setTimeout(() => {
                setText('')
            }, 2000);
        }
    }


    const editBlogs = async (id) => {
        setLoading(true)
        console.log('edit =>', id);
        console.log(JSON.stringify({titleUpdate, descriptionUpdate}));
    const response = await fetch(`${baseURL}/tasks/${id}`, {
        method: 'PUT',
            body: JSON.stringify({title: titleUpdate, description: descriptionUpdate}), //data in JSON is a key and value pair
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
    })
    console.log(response);
        const data = await response.json()
        if(response)setLoading(false)
        if(response.ok) {
            getBlogs()
            alert(data.detail)
            setIsOpen(close)
        }
        console.log(data);
        console.log(id);
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
            getBlogs()
            setText(data.detail)
            setLoading(false)
        }
        console.log(data);
        console.log(id);
        setTimeout(() => {
            setText('')
        }, 2000);
    }

  return (
    <div className='h-[100%] bg-black'>
        <div className="dashboard pb-2 w-[90%] h-[85vh] absolute left-[50%] top-[57%] md:top-[55%] -translate-x-[50%] -translate-y-[50%] md:w-[60%] lg:w-[45%] bg-gray-400 text-white rounded px-[2rem] md:px-[4rem] py-[2rem]">
            <p className='logo border-b-2 pb-3 text-2xl font-bold'>Dashboard</p>
            <div className="flex gap-1 justify-around my-3 border-b-2 pb-5 md:gap-12">
                <button className={selectedTab === 'tab1' ? 'active-tab' : 'inactive-tab'} onClick={() => handleTabClick('tab1')}>Add a Post</button>
                <button className={selectedTab === 'tab2' ? 'active-tab' : 'inactive-tab'} onClick={() => handleTabClick('tab2')}>All Posts</button>
                <button className={selectedTab === 'tab3' ? 'active-tab' : 'inactive-tab'} onClick={() => handleTabClick('tab3')}>Account Settings</button>
            </div>
            {selectedTab === 'tab1' && <div className=''>
            {text && <p className='text-green-800 bg-green-200 rounded text-sm p-1 border border-green-600 text-center'>{text}</p>}
            {error && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            <span class="font-medium">Alert!</span> The description should consist of at least 200 words..
            </div>}
                <input type="text" name="title" id="title" className='p-2 w-[100%] mt-5 border-slate-300 bg-white text-black rounded' placeholder='add a title' value={title} onChange={e => setTitle(e.target.value)}/>
                <textarea name="createPost" id="createPost" cols="70" rows="6" placeholder='create a post' className='rounded bg-white border-slate-300 text-black p-2 mt-3 w-[100%]' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                {loading ? <div className='btn glass pt-4 text-white mt-4 block w-[95%]'><i class="fa-solid fa-spinner fa-spin"></i></div> : <button onClick={() => postBlog()} className='btn glass text-white block w-[100%] mt-4'>Post</button>}
            </div>}

            {selectedTab === 'tab2' && <div className='mt-[2rem]'>
            {text && <p className='text-red-800 bg-red-200 rounded text-sm p-1 border border-red-600 text-center'>{text}</p>}
            {loading ? <div className='flex justify-center pt-4 text-white m-3 w-[90%]'><i class="fa-solid fa-spinner fa-spin"></i></div> : ''}
                {todos.slice(pageVisited, pageVisited + usersPerPage).map(todo => (
                    <div className="flex gap-2 justify-between items-center my-5">
                    <p className='uppercase font-bold'>{todo.title.length >= 10 ? todo.title.substring(0, 14) + '...' : todo.title}</p>
                    <div className="flex gap-2">
                    <button onClick={() => toggleModal(todo._id)} className='btn bg-white'>Edit</button>
                        <button onClick={()=> deleteBlogs(todo._id)} className='btn bg-red-500'>Delete</button>
                    </div>

                    {isOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto h-[80%] bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 w-[100%] md:w-[70%]">
                        <span
                        className="absolute top-0 right-0 m-4 cursor-pointer"
                        onClick={toggleModal}
                        >
                        <div className="text-2xl"><i class="ri-close-line"></i></div>
                        </span>
                        <p className="text-lg">
                        <input type="text" name="title" id="title" className='p-2 w-[100%] mt-5 border text-black rounded bg-white' placeholder='update title' value={titleUpdate} onChange={e => setTitleUpdate(e.target.value)}/>
                            <textarea name="createPost" id="createPost" cols="70" rows="6" placeholder='update description' className='rounded border text-black bg-white p-2 mt-3 w-[100%]' value={descriptionUpdate} onChange={e => setDescriptionUpdate(e.target.value)}></textarea>
                            {loading ? <div className='btn bg-gray-300 pt-4 text-white m-3 block w-[95%]'><i class="fa-solid fa-spinner fa-spin"></i></div> :<button onClick={() => editBlogs(blogID)} className='btn bg-gray-300 text-white m-3 block w-[100%] mt-6'>Update Post</button>}
                            </p>
                        </div>
                        </div>
                    )}

                </div>
                ))}
                <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={pageCount} onPageChange={changePage} containerClassName={"paginationBttns"} previousLinkClassName={"previousBttn"} nextLinkClassName={"nextBttn"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}/>
                {loading ? <div className='flex justify-center pt-4 text-white m-3 w-[90%]'><i class="fa-solid fa-spinner fa-spin"></i></div> : ''}
            </div>}
            {selectedTab === 'tab3' && <form onSubmit={updatePassword}>
                {text && <p className='text-yellow-800 bg-yellow-200 rounded text-sm p-1 border border-yellow-600 text-center'>{text}</p>}
                {error && <p className='text-red-800 bg-red-200 rounded text-sm p-1 border border-red-600 text-center'>Fields cannot be empty</p>}
                <label htmlFor="email" className=''>Email</label>
                <input type="text" name="email" id="email" className='w-[100%] border-slate-300 bg-white text-black p-2 rounded block mt-2 mb-3' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="userName" className='mt-5'>Username</label>
                <input type="text" name="username" id="userName" className='w-[100%] border-slate-300 bg-white text-black p-2 rounded block mt-2 mb-3' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password" className='mt-5'>Password</label>
                <input type="password" name="password" id="password" className='w-[100%] border-slate-300 bg-white text-black p-2 rounded block mt-2 mb-3' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="newPassword" className='mt-5'>New Password</label>
                <input type="newPassword" name="newPassword" id="newPassword" className='w-[100%] border-slate-300 bg-white text-black p-2 rounded block mt-2' placeholder='********' value={new_password} onChange={(e) => setNew_password(e.target.value)}/>
                {loading ? <div className='loader btn glass pt-4 text-white my-5 block w-[95%]'><i class="fa-solid fa-spinner fa-spin"></i></div> : <button type='submit' className='btn glass text-white my-5 block w-[95%]'>Update Password</button>}
            </form>}
        </div>
    </div>
  )
}

export default Dashboard