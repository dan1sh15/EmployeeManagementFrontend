import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { AppContext } from '../Context/AppContext';
import { IoPlayBack } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeModal = (props) => {
    const { editEmployee, setEditEmployee, setShowModal  } = props;
    const [newGender, setNewGender] = useState(editEmployee.gender);
    const [newCourse, setNewCourse] = useState(editEmployee.course);
    const [newFile, setNewFile] = useState(null);
    const [showFileUpdate, setShowFileUpdate] = useState(false);

    const navigate = useNavigate();

    const { fetchEmployeeData, setLoading } = useContext(AppContext);

    const handleCourseChange = (currCourse) => {
      if(newCourse === currCourse) {
        setNewCourse('');
      } else {
        setNewCourse(currCourse);
      }
    }

    const handleGenderChange = () => {
      if(newGender === "Male") {
        setNewGender("Female");
      } else {
        setNewGender("Male");
      }
    }

    const handleFileChange = (e) => {
      setNewFile(e.target.files[0]);
    }

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
        const url = process.env.REACT_APP_BACKEND_URL + '/updateEmployee/' + editEmployee._id;
        setLoading(true);
        const formData = new FormData();
        formData.append('name', editEmployee?.name);
        formData.append('email', editEmployee?.email);
        formData.append('mobileNumber', editEmployee?.mobileNumber);
        formData.append('designation', editEmployee?.designation);
        formData.append('gender', newGender);
        formData.append('course', newCourse);

        try {
          const response = await axios.put(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "auth-token": localStorage.getItem('token')
            }
          });
  
          const responseData = await response.data;
  
          if(responseData.success) {
            setLoading(false);
            await fetchEmployeeData();
            toast.success(responseData.message);
            navigate('/');
          } else {
            setLoading(false);
            toast.error(responseData.message);
          }
        } catch (error) {
          setLoading(false);
          toast.error(error.response?.data?.message);
        }

    };

    const handleImageUpload = async (e) => {
      e.preventDefault();
      setLoading(true);
      const url = process.env.REACT_APP_BACKEND_URL + '/updateEmployeeImage/' + editEmployee._id;

      const formData = new FormData();
      formData.append('image', newFile);

      try {
        const response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": localStorage.getItem('token')
          }
        });
  
        const responseData = await response.data;
  
        if(responseData.success) {
          setLoading(false);
          await fetchEmployeeData();
          navigate('/');
          toast.success(responseData.message);
        } else {
          setLoading(false);
          toast.error(responseData.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message)
      }
    }

    const closeHandler = () => {
      setShowModal(false);
    }

  return (
    <div className='w-[70%] gap-y-5 flex-col max-phone:w-[100%] max-ipad:w-[100%] mx-auto flex items-center justify-center rounded-lg'>
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
                <label htmlFor="mobileNumber" className='text-lg max-phone:text-xs'>
                    Employee Mobile Number
                </label>
                <input onChange={changeHandler} required type="tel" value={editEmployee?.mobileNumber} id='mobileNumber' pattern='[0-9]{10}' name='mobileNumber' className='border outline-none px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]' placeholder='Enter 10-digit Mobile Number' />
            </div>

            <div className='flex flex-col gap-y-2'>
                <label htmlFor="designation" className='text-lg max-phone:text-xs' >
                    Employee Designation
                </label>
                <select onChange={changeHandler} type="text" id='designation' value={editEmployee?.designation} name='designation' className='border outline-none max-phone:text-xs max-phone:placeholder:text-xs px-3 py-2 rounded-lg bg-[#2e3144]'>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="sales">sales</option>
                </select>
            </div>

            <fieldset className='flex border-2 p-3 bg-[#2e3144] rounded-lg flex-col gap-y-2'>
                <legend className='text-lg max-phone:text-xs'>
                    Employee Gender
                </legend>

                <div className='flex gap-x-5'>
                    <div className='flex items-center gap-x-2 flex-wrap'>
                        <label className='text-lg flex gap-x-2 cursor-pointer max-phone:text-xs'>
                            Male
                          <input onChange={handleGenderChange} type="radio" name='gender' checked={newGender === 'Male'} value='Male' className='border cursor-pointer px-3 py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]' /> 
                        </label>

                        <label className='text-lg flex gap-x-2 cursor-pointer max-phone:text-xs'>
                            Female 
                          <input onChange={handleGenderChange} checked={newGender === 'Female'} type="radio" name='gender' value='Female' className='border cursor-pointer px-3 py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]' />
                        </label>
                    </div>
                </div>
            </fieldset>

            <fieldset className='flex border-2 flex-wrap p-3 bg-[#2e3144] rounded-lg gap-x-5'>
              <legend>Courses</legend>
              <div className='flex items-center gap-x-2'>
                  <label htmlFor="bca" className='text-lg max-phone:text-xs cursor-pointer'>BCA</label>
                  <input 
                    type="checkbox"
                    id='bca'
                    checked={newCourse === 'BCA'}
                    onChange={ () => {
                      handleCourseChange("BCA");
                    } }
                    className='border cursor-pointer outline-none px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]'
                  />
              </div>
              <div className='flex items-center gap-x-3 '>
                  <label htmlFor="mca" className='text-lg max-phone:text-xs cursor-pointer'>MCA</label>
                  <input 
                    type="checkbox"
                    id='mca'
                    checked={newCourse === "MCA"}
                    onChange={ () => {
                      handleCourseChange("MCA");
                    } }
                    className='border cursor-pointer outline-none px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]'
                  />
              </div>
              <div className='flex items-center gap-x-3 '>
                  <label htmlFor="bsc" className='text-lg max-phone:text-xs cursor-pointer'>BSC</label>
                  <input 
                    type="checkbox"
                    id='bsc'
                    checked={newCourse === "BSC"}
                    onChange={ () => {
                      handleCourseChange("BSC");
                    } }
                    className='border cursor-pointer outline-none px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]'
                  />
              </div>
            </fieldset>

            <div className='flex w-full max-phone:flex-col max-phone:gap-y-3 justify-between'>
              <button onClick={closeHandler} className=' bg-gray-600 px-3 text-lg max-phone:text-sm py-2 rounded-lg cursor-pointer hover:bg-gray-500 transition-all duration-300 ease-in-out'>Close</button>
              <button className='bg-[#2e2fe8] text-lg max-phone:text-sm px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out'>Edit Employee</button>
            </div>
      </form>

      <div className='flex max-phone:w-[100%] max-phone:bg-transparent max-phone:p-3 max-ipad:w-[90%] bg-[#272937] poppins flex-col w-[75%] gap-y-4 p-7  rounded-2xl text-[#e5e4e8]'>
          {
              !showFileUpdate ? (<div onClick={() => {
                setShowFileUpdate(true);
              }} className='w-full bg-[#2e3144] text-center p-3 rounded-lg max-lg:text-lg max-sm:text-sm text-xl border-2 border-[#e5e4e8] cursor-pointer'>
                  Update Employee Profile Image?
                </div>) : (
                <div className='flex flex-col gap-y-2'>
                    <div onClick={() => { setShowFileUpdate(false); }} className='flex gap-x-2 items-center text-[#2e2fe8] cursor-pointer'>
                      <IoPlayBack />
                      Go Back
                    </div>
                    <form action="" onSubmit={handleImageUpload} className='flex flex-col gap-y-4'>
                      <label htmlFor="image">Image</label>
                      <input 
                        type="file" 
                        id='image'
                        onChange={handleFileChange}
                        className='w-full bg-[#2e3144] border-dashed border-2 border-[#e5e4e8] cursor-pointer file:border-none file:rounded-lg file:text-white file:bg-[#272736] file:p-3 p-3 rounded-lg'
                      />

                      <button type='submit' className='bg-[#2e2fe8] text-lg max-phone:text-sm px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out'>
                        Upload Image
                      </button>
                    </form>
                </div>
              )
            }
      </div>

    </div>
  )
}

export default EmployeeModal;
