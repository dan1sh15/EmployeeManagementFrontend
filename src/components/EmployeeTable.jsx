import React, { useContext, useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { RiUserSearchFill } from 'react-icons/ri';
import Toast, { toast } from 'react-hot-toast';
import EmployeeModal from './EmployeeModal';
import { AppContext } from '../Context/AppContext';
import DeleteModal from './DeleteModal';
import PhoneUser from './PhoneUser';
import { FaSortAlphaDown, FaSortNumericDown } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
  
const EmployeeTable = (props) => {
      const employeeData = props.employeeData;
      const setEmployeeData = props.setEmployeeData;
      const url = process.env.REACT_APP_BACKEND_URL;


      const [showModal, setShowModal] = useState(false);
      const [editEmployee, setEditEmployee] = useState({});
      const [showDltModal, setShowDltModal] = useState(false);
      const [userId, setUserId] = useState("");
      const { fetchEmployeeData } = useContext(AppContext);
      const [phoneComponent, setPhoneComponent] = useState(false);
      const [phoneEmployee, setPhoneEmployee] = useState({});

      const [searchKey, setSearchKey] = useState('');

      const changeHandler = (e) => {
        setSearchKey(e.target.value);
      }

      const handleSearch = async () => {

        if(searchKey === '') {
          await fetchEmployeeData();
          return;
        }

        const filteredEmployees = employeeData.filter(employee =>
          employee.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchKey.toLowerCase()) ||
          employee.mobileNumber.toString().includes(searchKey.toLowerCase()) ||
          employee.createdAt.toString().includes(searchKey.toLowerCase()) ||
          employee.course.toString().includes(searchKey.toUpperCase())
        );

        if(filteredEmployees.length > 0) setEmployeeData(filteredEmployees);
        else toast.error("No matching keyword found");
      }

      const editHandler = (employee) => {
          setEditEmployee(employee);
          setShowModal(true);
      }

      const deleteHandler = async (id) => {
        try {
          
          const response = await fetch(`${url}/deleteEmployee/${id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          const responseData = await response.json();
          if(responseData.success) {
            fetchEmployeeData();
            setShowDltModal(false);
            Toast.success("Employee deleted successfully");
          } else {
            setShowDltModal(false);
            Toast.error("Cannot delete employee, please try again later");
          }
          
        } catch (error) {
          Toast.error("Could not delete, please try again later");
          setShowDltModal(false);
        }
      };

      const handleDelete = (id) => {
        setShowDltModal(true);
        setUserId(id);
      }

      const phoneComponentHandler = (employee) => {
          setPhoneEmployee(employee);
          setPhoneComponent(true);
      }

      const handleNameSort = () => {
        const sortedEmployees = [...employeeData].sort((a, b) => a.name.localeCompare(b.name));
        setEmployeeData(sortedEmployees);
      }

      const handleEmailSort = () => {
        const sortedEmployees = [...employeeData].sort((a, b) => a.email.localeCompare(b.email));
        setEmployeeData(sortedEmployees);
      }

      const handleMobileSort = () => {
        const sortedEmployees = [...employeeData].sort((a, b) => a.mobileNumber - b.mobileNumber);
        setEmployeeData(sortedEmployees);
      }

  return (
    <>

      {
        showDltModal ? (<DeleteModal setShowDltModal={setShowDltModal} deleteHandler={deleteHandler} userId={userId} />) : (
          <div className={`w-full max-phone:p-2  max-phone:py-5 max-[200px]:p-0 p-5 rounded-lg relative bg-[#353449]`}>
            {
                showModal ? (<EmployeeModal editEmployee={editEmployee} setEditEmployee={setEditEmployee} setShowModal={setShowModal} />) : (
                  phoneComponent ? (<PhoneUser setPhoneComponent={setPhoneComponent} phoneEmployee={phoneEmployee} editHandler={editHandler} handleDelete={handleDelete} />) : (

                    <div className='flex w-full flex-col gap-y-5'>
                      <div className='flex w-full justify-end'>
                          <div className='flex gap-x-3 items-center'>
                            <label htmlFor="search" className='text-lg max-phone:text-xs'>Search</label>
                            <input 
                              type="text"
                              name='search'
                              className='border outline-none px-3 py-2 max-phone:text-xs max-phone:placeholder:text-xs rounded-lg bg-[#2e3144]'
                              placeholder='Enter search keyword'
                              value={searchKey}
                              onChange={changeHandler}
                            />

                            <button onClick={handleSearch} className='bg-[#2e2fe8] text-xl p-2 rounded-lg'>
                              <IoSearch />
                            </button>
                          </div>
                      </div>
                      <table className='w-full max-phone:mx-auto max-phone:rounded-lg max-phone:h-[100%] max-phone:w-[80%] border'>
                        <thead className='bg-[#272937] max-xl:text-lg max-lg:text-sm text-lf h-auto ipad:h-10 tracking-wide max-phone:text-[0.75rem]'>
                            <tr>
                              <th className='border'>Unique Id</th>
                              <th className='border max-phone:hidden'>Image</th>
                              <th className='border'>
                                <div className='flex w-fit mx-auto items-center gap-x-2'>
                                  <p>Name</p>
                                  <div onClick={handleNameSort} title='Sort' className='cursor-pointer p-1 rounded-full bg-[#e5e4e8]'>
                                    <FaSortAlphaDown className='cursor-pointer text-[#353449]' />
                                  </div>
                                </div>
                              </th>
                              <th className='border max-phone:hidden'>
                                <div className='flex w-fit mx-auto items-center gap-x-2'>
                                    <p>Email</p>
                                    <div onClick={handleEmailSort} title='Sort' className='cursor-pointer p-1 rounded-full bg-[#e5e4e8]'>
                                      <FaSortAlphaDown className='cursor-pointer text-[#353449]' />
                                    </div>
                                </div>
                              </th>
                              <th className='border max-phone:hidden'>
                                  <div className='flex w-fit mx-auto items-center gap-x-2'>
                                      <p>Mobile No.</p>
                                      <div onClick={handleMobileSort} title='Sort' className='cursor-pointer p-1 rounded-full bg-[#e5e4e8]'>
                                        <FaSortNumericDown className='cursor-pointer text-[#353449]' />
                                      </div>
                                  </div>
                              </th>
                              <th className='border max-phone:hidden'>Designation</th>
                              <th className='border max-phone:hidden'>Gender</th>
                              <th className='border max-phone:hidden'>Course</th>
                              <th className='border max-phone:hidden'>Create date</th>
                              <th className='border max-phone:hidden'>Action</th>
                            </tr>
                        </thead>

                        <tbody className='w-full border max-phone:text-[0.75rem]'>
                            {
                                employeeData.map((employee, idx) => (
                                  <tr key={idx} className='w-full border text-center max-phone:text-[0.75rem] max-sm:text-xs  h-auto ipad:h-10 max-xl:text-lg max-lg:text-sm text-lg'>
                                    <td className='border-r'>{idx+1}</td>
                                    <td className='max-phone:hidden border'>
                                      <div className='flex items-center justify-center'>
                                        <img className='rounded-full cover h-[45px] w-[45px]' src={employee?.image} alt="" />  
                                      </div>
                                    </td>
                                    <td className='
                                      max-phone:border-none
                                      border-r flex items-center max-phone:justify-between max-phone:text-left max-phone:leading-snug h-10 max-phone:px-1
                                      '>
                                      {employee?.name} 
                                      <RiUserSearchFill
                                      onClick={() => phoneComponentHandler(employee)} 
                                      className='text-[0.75rem] phone:hidden cursor-pointer hover' title='Show Details' />
                                    </td>
                                    <td className='border-r max-phone:hidden'>{employee?.email}</td>
                                    <td className='border-r max-phone:hidden'>{employee?.mobileNumber}</td>
                                    <td className='border-r max-phone:hidden'>{employee?.designation}</td>
                                    <td className='border-r max-phone:hidden'>{employee?.gender}</td>
                                    <td className='border-r max-phone:hidden'>{employee?.course}</td>
                                    <td className='border-r max-phone:hidden'>{employee?.createdAt}</td>
                                    <td className=' flex px-3 max-phone:hidden justify-between items-center phone:h-10'>
                                      <div  className='text-center w-full'>
                                      {employee.role}
                                      </div> 
                                      <div className='flex gap-x-2'>
                                        <FaUserEdit title='Edit' onClick={() => { editHandler(employee) }} className='cursor-pointer max-phone:text-[0.75rem] hover:scale-[1.2] transition-all duration-300 ease-in-out' />
                                        <MdDelete title='Delete' onClick={() => { handleDelete(employee._id) }} className='cursor-pointer max-phone:text-[0.75rem] hover:scale-[1.2] transition-all duration-300 ease-in-out' />
                                      </div>
                                    </td>
                                  </tr>
                                ))
                            }
                        </tbody>
                      </table>
                    </div>
                  )
                )
            }
          </div>
        )
      }

    </>
  )
}

export default EmployeeTable
