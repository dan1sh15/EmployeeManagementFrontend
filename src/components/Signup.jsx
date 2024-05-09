import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';
import Loader from './Loader';

const Signup = () => {
  const navigate = useNavigate();
  const { loading, setLoading, setLoggedIn, setAdminDetails } = useContext(AppContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  }

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
    const url = process.env.REACT_APP_BACKEND_URL + '/signup';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...userDetails})
    });

    const responseData = await response.json();
    if(responseData.success) {
      localStorage.setItem('token', responseData.token);
      setAdminDetails(userDetails);
      setLoading(false);
      setLoggedIn(true);
      navigate('/');
      toast.success(responseData.message);
    } else {
      setLoading(false);
      toast.error(responseData.message);
    }
  }

  return (
    <>
      {
        loading ? (<Loader />) : (
          <div className='w-10/12 mx-auto pt-[10vh] h-auto min-h-[100vh] flex items-center justify-center'>
            <form onSubmit={submitHandler} className='w-[35%] border-2 bg-[#313345] text-[#e5e4e8] border-[#e5e4e8] rounded-xl p-6 flex flex-col gap-y-5'>
                  <h1 className='text-4xl font-bold  text-center'>Sign Up</h1>
                  <div className='flex flex-col gap-y-3'>
                      <label htmlFor="name" className='text-xl tracking-wide'>Name</label>
                      <input 
                        required
                          id='name'
                          onChange={changeHandler}
                          value={userDetails.name}
                          type="text" 
                          name='name'
                          className='border px-3 outline-none py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]'    
                          placeholder='Enter your name'
                      />
                  </div>
                  <div className='flex flex-col gap-y-3'>
                      <label htmlFor="email" className='text-xl tracking-wide'>Email</label>
                      <input 
                          required
                          id='email'
                          onChange={changeHandler}
                          value={userDetails.email}
                          type="email" 
                          name='email'
                          className='border px-3 outline-none py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]'    
                          placeholder='Enter your email'
                      />
                  </div>

                  <div className='flex flex-col gap-y-3'>
                      <label htmlFor="password" className='text-xl tracking-wide'>Password</label>
                      <input 
                        required
                          id='password'
                          onChange={changeHandler}
                          value={userDetails.password}
                          type={`${showPassword ? 'text' : 'password'}`} 
                          name='password'
                          className='border px-3 outline-none py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]'    
                          placeholder='Enter password'
                      />
                  </div>
                  <div className='flex flex-col gap-y-3'>
                      <label htmlFor="confirmPassword" className='text-xl tracking-wide'>Confirm Password</label>
                      <input 
                        required
                          id='confirmPassword'
                          onChange={changeHandler}
                          value={userDetails.confirmPassword}
                          type={`${showPassword ? 'text' : 'password'}`} 
                          name='confirmPassword'
                          className='border px-3 outline-none py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]'    
                          placeholder='Enter password again'
                      />
                  </div>

                  <div className='flex items-center gap-x-3'>
                    <label htmlFor="showPassword"  className='text-lg'>Show Password</label>
                    <input 
                      type="checkbox"
                      name='showPassword'
                      id='showPassword'
                      checked={showPassword}
                      onChange={handlePassword}
                      />
                  </div>

                  <button className='px-3 py-2 h-fit font-semibold bg-[#2e2fe8] text-xl rounded-lg cursor-pointer max-ipad:text-sm max-phone:text-xs max-ipad:px-2 hover:bg-blue-600 transition-all duration-300 ease-in-out'>
                      Sign Up
                  </button>
                  <div className='text-center text-[#e5e4e8aa]'>
                      Already registered? | <span className='text-[#2e2fe8] cursor-pointer' onClick={() => { navigate('/login') }}>Log In</span>
                  </div>
              </form>
          </div>
        )
      }
    </>
  )
}

export default Signup
