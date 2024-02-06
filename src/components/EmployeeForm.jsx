import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import { IoPlayBack } from 'react-icons/io5';

const EmployeeForm = (props) => {

    const navigate = useNavigate();
    const {formData, changeHandler, submitHandler} = props;
  return (
    <form onSubmit={submitHandler} className='flex poppins flex-col max-lg:w-[100%] w-[75%] max-phone:p-4 gap-y-4 p-7 bg-[#353449] rounded-2xl text-[#e5e4e8]'>
            <div>
                <h1 className='text-3xl font-bold tracking-wide max-phone:text-xl max-phone:tracking-normal'>Create an Employee</h1>
                <p onClick={() => { navigate('/'); }} className='flex text-md max-phone:text-sm text-[#2e2fe8] gap-x-1 items-center cursor-pointer'><IoPlayBack />Back to Employee</p>
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="name" className='text-lg max-phone:text-sm'>    
                    Employee Name
                </label>
                <input onChange={changeHandler} required value={formData.name} type="text" id="name" name='name' className='border px-3 py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]' placeholder='Enter your full name' />
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="email" className='text-lg max-phone:text-xs'>
                    Employee Email Id
                </label>
                <input onChange={changeHandler} required type="email" value={formData.email} id='email' name='email' className='border px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]' placeholder='Enter your email address' />
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="title" className='text-lg max-phone:text-xs'>
                    Employee Title
                </label>
                <input onChange={changeHandler} required type="text" value={formData.title} id='title' name='title' className='border px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]' placeholder='Enter your Employee title' />
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="department" className='text-lg max-phone:text-xs' >
                    Employee Department
                </label>
                <input onChange={changeHandler} type="text" id='department' value={formData.department} name='department' className='border max-phone:text-xs max-phone:placeholder:text-xs px-3 py-2 rounded-lg bg-[#2e3144]' placeholder='Enter your Employee department' />
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="role" className='text-lg max-phone:text-xs'>
                    Employee role
                </label>
                <input onChange={changeHandler} type="text" id='role' name='role' value={formData.role} className='border px-3 py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]' placeholder='Enter your Employee role' />
            </div>

            <button className='bg-[#2e2fe8] text-lg py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 max-phone:text-xs ease-in-out'>Create Employee</button>
    </form>
  )
}

export default EmployeeForm
