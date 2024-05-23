import React, { useContext, useEffect } from 'react';
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate();

    const { loggedIn, setLoggedIn, adminDetails, fetchUserDetails } = useContext(AppContext);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        toast.success("Logged Out");
        navigate('/login');
    }

    useEffect(() => {
      const token = localStorage.getItem('token');
      if(token) {
        setLoggedIn(true);
        fetchUserDetails();
      } else {
        setLoggedIn(false);
        navigate('/login');
      }
    }, []);


  return (
    <div className='fixed z-10 bg-[#272937] w-full h-[12vh] shadow-lg'>
      <div className='w-10/12 max-xl:w-11/12  mx-auto flex h-full items-center justify-between'>
        <div className='flex items-center justify-center'>
            <img onClick={() => { navigate('/') }} className=' cursor-pointer rounded-full bg-white bg-cover' height={50} width={50} src={logo} alt="" />
        </div>

        {
            loggedIn ? (
                <div className='flex items-center max-lg:text-lg max-md:text-sm max-phone:text-xs max-sm:gap-x-2 gap-x-5 text-[#e5e4e8] max-[300px]:flex-col max-[300px]:gap-y-1'>
                    <h1 className='font-semibold'>{adminDetails?.name}</h1>
                    <button onClick={handleLogout} className='px-3 py-1 h-fit font-semibold bg-[#2e2fe8] text-lg max-sm:rounded-md rounded-lg cursor-pointer max-ipad:text-sm max-phone:text-xs max-ipad:px-2 hover:bg-blue-600 transition-all duration-300 ease-in-out max-[300px]:w-full'>Log Out</button>
                </div>
            ) :(
                <div className='flex text-[#e5e4e8] items-center gap-x-5'>
                    <button onClick={() => navigate('/login')} className='px-3 py-1 h-fit bg-[#2e2fe8] text-lg rounded-lg cursor-pointer max-ipad:text-sm max-phone:text-xs max-ipad:px-2 font-semibold hover:bg-blue-600 transition-all duration-300 ease-in-out'>Login</button>
                    <button onClick={() => navigate('/signup')} className='px-3 py-1 h-fit font-semibold bg-[#2e2fe8] text-lg rounded-lg cursor-pointer max-ipad:text-sm max-phone:text-xs max-ipad:px-2 hover:bg-blue-600 transition-all duration-300 ease-in-out'>Signup</button>
                </div>
            )
        }
      </div>
    </div>
  )
}

export default Navbar
