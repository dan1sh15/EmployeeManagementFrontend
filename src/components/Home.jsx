import React, { useContext, useEffect } from 'react'
import "../App.css";
import { useNavigate } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';
import { AppContext } from '../Context/AppContext';
import Loader from './Loader';

const Home = () => {
    const navigate = useNavigate();
    const { fetchEmployeeData, employeeData, loading } = useContext(AppContext);

    useEffect(() => {
        fetchEmployeeData();
        // eslint-disable-next-line 
    }, []);

  return (
    <div className={`w-10/12 max-phone:w-full  text-[#e5e4e8] px-3 mx-auto poppins`}>
        <div className='flex w-full py-5 justify-between max-[250px]:items-center max-sm:items-end items-center max-sm:flex-col max-sm:gap-y-3 max-phone:gap-y-5'>
            <div className='w-[70%] max-sm:w-[100%]'>
                <h1 className='text-2xl max-xl:text-xl max-phone:text-[1.5rem] font-bold tracking-wide'>
                    Employees
                </h1>

                <p className='text-sm max-lg:text-xs max-phone:text-[0.65rem]'>This is a list of all employees. You can add new employees, edit or delete existing ones.</p>
            </div>

            <button onClick={() => { navigate('/addEmployee') }} className='px-3 py-2 h-fit bg-[#2e2fe8] text-lg rounded-lg cursor-pointer max-ipad:text-sm max-phone:text-xs max-ipad:px-2 hover:bg-blue-600 transition-all duration-300 ease-in-out'>Add Employee</button>

        </div>
        {
            loading ? <Loader /> : <EmployeeTable employeeData={employeeData} />
        }
    </div>
  )
}

export default Home
