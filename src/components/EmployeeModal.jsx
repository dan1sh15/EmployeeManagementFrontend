import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { AppContext } from '../Context/AppContext';

const EmployeeModal = (props) => {
    const { editEmployee, setEditEmployee, setShowModal  } = props;

    const { fetchEmployeeData, setLoading } = useContext(AppContext);

    const changeHandler = (event) => {
        setEditEmployee( prevFormData => {
          return {
            ...prevFormData,
            [event.target.name]: event.target.value
          }
        });
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_BACKEND_URL;
        try {
            setLoading(true);
          const updatedEmployee = await fetch(`${url}/updateEmployee/${editEmployee._id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({...editEmployee})
          });

          if(updatedEmployee.ok) {
            setLoading(false);
            toast.success("Employee details updated successfully");
            setShowModal(false);
            fetchEmployeeData();
          } else {
            setLoading(false);
            toast.error("Cannot update employee details");
            setShowModal(false);
          }

        } catch (error) {
          setLoading(false);
          console.log(error);
          toast.error(error);
          setShowModal(false);
        }
    };

    const closeHandler = () => {
      setShowModal(false);
    }

  return (
    <div className='w-[70%] max-phone:w-[100%] max-ipad:w-[100%] mx-auto flex items-center justify-center rounded-lg'>
      <form onSubmit={submitHandler} className='flex max-phone:w-[100%] max-phone:bg-transparent max-phone:p-3 max-ipad:w-[90%] bg-[#272937] poppins flex-col w-[75%] gap-y-4 p-7  rounded-2xl text-[#e5e4e8]'>
            <div>
                <h1 className='text-3xl max-lg:text-2xl max-phone:text-lg font-bold text-center tracking-wide'>Edit Employee</h1>
            </div> 

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="name" className='text-lg max-phone:text-sm'>
                    Employee Name
                </label>
                <input onChange={changeHandler} required value={editEmployee.name} type="text" id="name" name='name' className='border px-3 max-phone:text-xs max-phone:placeholder:text-xs py-2 rounded-lg bg-[#2e3144]' placeholder='Enter your full name' />
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="email" className='text-lg max-phone:text-sm'>
                    Employee Email Id
                </label>
                <input onChange={changeHandler} required type="email" value={editEmployee.email} id='email' name='email' className='border max-phone:text-xs max-phone:placeholder:text-xs px-3 py-2 rounded-lg bg-[#2e3144]' placeholder='Enter your email address' />
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="title" className='text-lg max-phone:text-sm'>
                    Employee Title
                </label>
                <input onChange={changeHandler} required type="text" value={editEmployee.title} id='title' name='title' className='border max-phone:text-xs max-phone:placeholder:text-xs px-3 py-2 rounded-lg bg-[#2e3144]' placeholder='Enter your Employee title' />
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="department" className='text-lg max-phone:text-sm' >
                    Employee Department
                </label>
                <input onChange={changeHandler} type="text" id='department' value={editEmployee.department} name='department' className='border max-phone:text-xs max-phone:placeholder:text-xs px-3 py-2 rounded-lg bg-[#2e3144]' placeholder='Enter your Employee department' />
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="role" className='text-lg max-phone:text-sm'>
                    Employee role
                </label>
                <input onChange={changeHandler} type="text" id='role' name='role' value={editEmployee.role} className='border px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]' placeholder='Enter your Employee role' />
            </div>

            <div className='flex w-full max-phone:flex-col max-phone:gap-y-3 justify-between'>
              <button onClick={closeHandler} className=' bg-gray-600 px-3 text-lg max-phone:text-sm py-2 rounded-lg cursor-pointer hover:bg-gray-500 transition-all duration-300 ease-in-out'>Close</button>
              <button className='bg-[#2e2fe8] text-lg max-phone:text-sm px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out'>Edit Employee</button>
            </div>
      </form>
    </div>
  )
}

export default EmployeeModal;
