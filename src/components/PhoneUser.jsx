import React from 'react';
import {FaUserEdit} from "react-icons/fa";
import { MdDelete } from 'react-icons/md';


const PhoneUser = (props) => {
    const { phoneEmployee, setPhoneComponent, editHandler, handleDelete } = props;
    const imgUrl = process.env.REACT_APP_IMG_URL;
    console.log(phoneEmployee);
    const clickHandler = () => {
        setPhoneComponent(false);
    }

  return (
    <div className='h-[80%] mx-auto max-[200px]:p-2 p-5 flex flex-col gap-y-4'>
        
        <div className='flex items-center max-[200px]:flex-col max-[200px]:gap-y-3 justify-between w-full'>
          <img src={`${imgUrl} + ${phoneEmployee.name} + &background=2e2fe8&color=fff&rounded=true`} alt="" />
          <div className='flex flex-col gap-y-3'>
            <button
              onClick={() => {editHandler(phoneEmployee)}}
             className='flex items-center gap-x-2 justify-between bg-[#2e2fe8] text-xs max-[200px]:text-xs max-phone:text-[0.75rem] px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out'>Edit<FaUserEdit /></button>
            <button
              onClick={() => {handleDelete(phoneEmployee._id)}}
             className='flex items-center gap-x-2 justify-between bg-[#2e2fe8] text-xs max-[200px]:text-xs max-phone:text-[0.75rem] px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out'>Delete<MdDelete /></button>
          </div>
        </div>

        <h1 className='bg-[#272937] max-[200px]:text-xs max-[360px]:text-sm w-full px-3 py-2 rounded-lg'><span className='text-[#2e2fe8]'>Name:</span> {phoneEmployee.name}</h1>

        <p className='bg-[#272937] max-[200px]:text-xs max-[360px]:text-sm w-ful px-3 py-2 rounded-lg'><span className='text-[#2e2fe8]'>Title:</span> {phoneEmployee.title}</p>
        <p className='bg-[#272937] max-[200px]:text-xs max-[360px]:text-sm w-ful px-3 py-2 rounded-lg'><span className='text-[#2e2fe8]'>Role:</span> {phoneEmployee.role}</p>
        <button className='bg-gray-600 w-fit mx-auto max-[360px]:text-sm px-3 text-lg max-phone:text-[1rem] py-2 rounded-lg cursor-pointer hover:bg-gray-500 transition-all duration-300 ease-in-out' onClick={clickHandler}>Close</button>
    </div>
  )
}

export default PhoneUser
