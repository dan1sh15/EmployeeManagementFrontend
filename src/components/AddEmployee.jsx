import React, { useContext, useState } from 'react'
import img from "../assets/image.jpg";
import { IoPlayBack } from 'react-icons/io5';
import Toast, { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import Loader from './Loader';

const AddEmployee = () => {

    const [employeeData, setEmployeeData] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        designation: "HR",
    });
    const [gender, setGender] = useState("Male");
    const [course, setCourse] = useState('');

    const { loading, setLoading, fetchEmployeeData } = useContext(AppContext);
    const [imageFile, setImageFile] = useState(null);

    const handleCourseChange = (currCourse) => {
      if(course === currCourse) {
        setCourse('');
      } else {
        setCourse(currCourse);
      }
    }

    const handleFileChange = (e) => {
      setImageFile(e.target.files[0]);
    }

    const handleGenderChange = () => {
      if(gender === 'Male') {
        setGender("Female");
      } else {
        setGender("Male");
      }
    }

    const navigate = useNavigate();

    const changeHandler = (event) => {
      setEmployeeData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        });
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const url = process.env.REACT_APP_BACKEND_URL + '/createEmployee';
        const formData = new FormData();
        formData.append('name', employeeData.name);
        formData.append('email', employeeData.email);
        formData.append('mobileNumber', employeeData.mobileNumber);
        formData.append('designation', employeeData.designation);
        formData.append('gender', gender);
        formData.append('image', imageFile);
        if(course === '') {
          Toast.error('Course field is required');
          return;
        }
        formData.append('course', course);

        try {
          const response = await axios.post(url, formData, {
            headers: {
              "Content-Type": 'multipart/form-data',
              'auth-token': localStorage.getItem('token')
            }
          });
          const responseData = await response.data;
  
          if(responseData.success) {
            setLoading(false);
            await fetchEmployeeData();
            navigate('/');
            Toast.success(responseData.message);
          } else {
            setLoading(false);
            Toast.error(responseData.message);
          }
        } catch (error) {
          setLoading(false);
          toast.error(error.response?.data?.message);
        }

    }

  return (
    <>
      {
        loading ? (<Loader />) :(
          <div className='w-10/12 py-[13vh] h-auto min-h-[100vh] items-center mx-auto flex '>
            <div className='w-[50%] max-ipad:hidden flex items-center h-[75%]'>
              <img src={img} alt="" className='h-[80%] rounded-xl w-[90%] object-fit max-lg:object-contain' />        
            </div>
            <div className='w-[50%] max-ipad:w-[100%] flex justify-center items-center'>
                <form onSubmit={submitHandler} className='flex poppins flex-col max-lg:w-[100%] w-[75%] max-phone:p-4 gap-y-4 p-7 bg-[#353449] rounded-2xl text-[#e5e4e8]'>
                      <div>
                          <h1 className='text-3xl font-bold tracking-wide max-phone:text-xl max-phone:tracking-normal'>Create an Employee</h1>
                          <p onClick={() => { navigate('/'); }} className='flex text-md max-phone:text-sm text-[#2e2fe8] gap-x-1 items-center cursor-pointer'><IoPlayBack />Back to Employee</p>
                      </div>

                      <div className='flex flex-col gap-y-2'>
                          <label htmlFor="name" className='text-lg max-phone:text-sm'>    
                              Employee Name
                          </label>
                          <input onChange={changeHandler} required value={employeeData.name} type="text" id="name" name='name' className='border px-3 outline-none py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]' placeholder='Enter your full name' />
                      </div>

                      <div className='flex flex-col gap-y-2'>
                          <label htmlFor="email" className='text-lg max-phone:text-xs'>
                              Employee Email Id
                          </label>
                          <input onChange={changeHandler} required type="email" value={employeeData.email} id='email' name='email' className='border outline-none px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]' placeholder='Enter your email address' />
                      </div>

                      <div className='flex flex-col gap-y-2'>
                          <label htmlFor="mobileNumber" className='text-lg max-phone:text-xs'>
                              Employee Mobile Number
                          </label>
                          <input onChange={changeHandler} required type="tel" value={employeeData.mobileNumber} id='mobileNumber' pattern='[0-9]{10}' name='mobileNumber' className='border outline-none px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]' placeholder='Enter 10-digit Mobile Number' />
                      </div>

                      <div className='flex flex-col gap-y-2'>
                          <label htmlFor="designation" className='text-lg max-phone:text-xs' >
                              Employee Designation
                          </label>
                          <select onChange={changeHandler} type="text" id='designation' value={employeeData.designation} name='designation' className='border outline-none max-phone:text-xs max-phone:placeholder:text-xs px-3 py-2 rounded-lg bg-[#2e3144]'>
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
                              <div className='flex items-center gap-x-2'>
                                  <label className='text-lg flex gap-x-2 cursor-pointer max-phone:text-xs'>
                                      Male
                                    <input onChange={handleGenderChange} type="radio" name='gender' checked={gender === 'Male'} value='Male' className='border cursor-pointer px-3 py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]' /> 
                                  </label>

                                  <label className='text-lg flex gap-x-2 cursor-pointer max-phone:text-xs'>
                                      Female 
                                    <input onChange={handleGenderChange} checked={gender === 'Female'} type="radio" name='gender' value='Female' className='border cursor-pointer px-3 py-2 rounded-lg max-phone:text-xs max-phone:placeholder:text-xs bg-[#2e3144]' />
                                  </label>
                              </div>
                          </div>
                      </fieldset>

                      <fieldset className='flex border-2 p-3 bg-[#2e3144] rounded-lg gap-x-5'>
                        <legend>Courses</legend>
                        <div className='flex items-center gap-x-2 '>
                            <label htmlFor="bca" className='text-lg max-phone:text-xs cursor-pointer'>BCA</label>
                            <input 
                              type="checkbox"
                              id='bca'
                              checked={course === 'BCA'}
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
                              checked={course === "MCA"}
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
                              checked={course === "BSC"}
                              onChange={ () => {
                                handleCourseChange("BSC");
                              } }
                              className='border cursor-pointer outline-none px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]'
                            />
                        </div>
                      </fieldset>

                      <div className='flex flex-col gap-y-2'>
                          <label htmlFor="image">Image</label>
                          <input 
                            type="file" 
                            id='image'
                            onChange={handleFileChange}
                            className='w-full bg-[#2e3144] border-dashed border-2 border-[#e5e4e8] cursor-pointer file:border-none file:rounded-lg file:text-white file:bg-[#272736] file:p-3 p-3 rounded-lg'
                          />
                      </div>

                      <button className='bg-[#2e2fe8] text-lg py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-all duration-300 max-phone:text-xs ease-in-out'>Create Employee</button>
              </form>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AddEmployee
