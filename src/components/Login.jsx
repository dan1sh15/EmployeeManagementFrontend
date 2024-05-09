import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';
import Loader from './Loader';

const Login = () => {
    const navigate = useNavigate();
    const {loading, setLoading, setLoggedIn, setAdminDetails} = useContext(AppContext);
    
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (e) => {
        setUserDetails(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = process.env.REACT_APP_BACKEND_URL + '/login';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...userDetails})
        });

        const responseData = await response.json();
        if(responseData.success) {
            localStorage.setItem('token', responseData.token);
            setAdminDetails(responseData.user);
            setLoggedIn(true);
            setLoading(false);
            navigate('/');
            toast.success(responseData.message);
        } else {
            toast.error(responseData.message);
            setLoading(false);
        }
    }

  return (
    <>
        {
            loading ? (<Loader />) : (
                <div className='w-10/12 mx-auto pt-[10vh] h-auto min-h-[100vh] flex items-center justify-center'>
                    <form onSubmit={submitHandler} className='w-[35%] border-2 bg-[#313345] text-[#e5e4e8] border-[#e5e4e8] rounded-xl p-7 flex flex-col gap-y-5'>
                        <h1 className='text-4xl font-bold  text-center'>Login</h1>
                        <div className='flex flex-col gap-y-3'>
                            <label htmlFor="email" className='text-xl tracking-wide'>Email</label>
                            <input 
                                type="email" 
                                onChange={changeHandler}
                                value={userDetails.email}
                                name='email'
                                className='border px-3 outline-none py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]'    
                                placeholder='Enter your registered Email'
                            />
                        </div>

                        <div className='flex flex-col gap-y-3'>
                            <label htmlFor="password" className='text-xl tracking-wide'>Password</label>
                            <input 
                                type="password" 
                                onChange={changeHandler}
                                value={userDetails.password}
                                name='password'
                                className='border px-3 outline-none py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]'    
                                placeholder='Enter password'
                            />
                        </div>

                        <button className='px-3 py-2 h-fit font-semibold bg-[#2e2fe8] text-xl rounded-lg cursor-pointer max-ipad:text-sm max-phone:text-xs max-ipad:px-2 hover:bg-blue-600 transition-all duration-300 ease-in-out'>
                            Log In
                        </button>
                        <div className='text-center text-[#e5e4e8aa]'>
                            Not registered yet? | <span className='text-[#2e2fe8] cursor-pointer' onClick={() => { navigate('/signup') }}>Sign Up</span>
                        </div>
                    </form>

                </div>
            )
        }
    </>
  )
}

export default Login
