import React, { useContext, useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { RiUserSearchFill } from 'react-icons/ri';
import Toast from 'react-hot-toast';
import EmployeeModal from './EmployeeModal';
import { AppContext } from '../Context/AppContext';
import DeleteModal from './DeleteModal';
import PhoneUser from './PhoneUser';
 
const EmployeeTable = (props) => {
      const employeeData = props.employeeData;
      const imgUrl = process.env.REACT_APP_IMG_URL;
      const url = process.env.REACT_APP_BACKEND_URL;

      const [showModal, setShowModal] = useState(false);
      const [editEmployee, setEditEmployee] = useState({});
      const [showDltModal, setShowDltModal] = useState(false);
      const [userId, setUserId] = useState("");
      const { fetchEmployeeData } = useContext(AppContext);
      const [phoneComponent, setPhoneComponent] = useState(false);
      const [phoneEmployee, setPhoneEmployee] = useState({});

      const editHandler = (employee) => {
          setEditEmployee(employee);
          setShowModal(true);
      }

      const deleteHandler = async (id) => {
        try {
          const deletedEmployee = await fetch(`${url}/deleteEmployee/${id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json"
            },
          });

          if(deletedEmployee.ok) {
            Toast.success("Employee deleted successfully");
            fetchEmployeeData();
            
          } else {
            Toast.error("Cannot delete employee, please try again later");
          }
          
        } catch (error) {
          console.log(error);
          Toast.error("Could not delete, please try again later");
          setShowDltModal(false);
        }
        setShowDltModal(false);
      };

      const handleDelete = (id) => {
        setShowDltModal(true);
        setUserId(id);
      }

      const phoneComponentHandler = (employee) => {
          setPhoneEmployee(employee);
          setPhoneComponent(true);
      }

  return (
    <>

      {
        showDltModal ? (<DeleteModal setShowDltModal={setShowDltModal} deleteHandler={deleteHandler} userId={userId} />) : (
          <div className={`w-full max-phone:p-2  max-phone:py-5 max-[200px]:p-0 p-5 rounded-lg relative bg-[#353449]`}>
            {
                showModal ? (<EmployeeModal editEmployee={editEmployee} setEditEmployee={setEditEmployee} setShowModal={setShowModal} />) : (
                  phoneComponent ? (<PhoneUser setPhoneComponent={setPhoneComponent} phoneEmployee={phoneEmployee} editHandler={editHandler} handleDelete={handleDelete} />) : (
                    <table className='w-full max-phone:mx-auto max-phone:rounded-lg max-phone:h-[100%] max-phone:w-[80%] border'>
                      <thead className='bg-[#272937] max-xl:text-lg max-lg:text-sm text-xl h-auto ipad:h-10 tracking-wide max-phone:text-[0.75rem]'>
                          <tr>
                            <th className='border'>S No.</th>
                            <th className='border max-phone:hidden'>Icon</th>
                            <th className='border'>Employee Name</th>
                            <th className='border max-phone:hidden'>Title</th>
                            <th className='border max-phone:hidden'>Role</th>
                          </tr>
                      </thead>

                      <tbody className='w-full border max-phone:text-[0.75rem]'>
                          {
                              employeeData.map((employee, idx) => (
                                <tr key={idx} className='w-full border text-center max-phone:text-[0.75rem] max-sm:text-xs  h-auto ipad:h-10 max-xl:text-lg max-lg:text-sm text-lg'>
                                  <td className='border-r'>{idx+1}</td>
                                  <td className='max-phone:hidden  border'>
                                    <div className='flex items-center justify-center'>
                                      <img className='w-[2.5rem] max-ipad:w-[2rem] max-sm:w-[1.5rem] max-md:w-[1.75rem]' src={`${imgUrl} + ${employee.name} + &background=2e2fe8&color=fff&rounded=true`} alt="" />  
                                    </div>
                                  </td>
                                  <td className='
                                    max-phone:border-none
                                    border-r flex items-center max-phone:justify-between max-phone:text-left max-phone:leading-snug h-10 max-phone:px-1
                                    '>
                                    {employee.name} 
                                    <RiUserSearchFill
                                    onClick={() => phoneComponentHandler(employee)} 
                                    className='text-[0.75rem] phone:hidden cursor-pointer hover' title='Show Details' />
                                  </td>
                                  <td className='border-r max-phone:hidden'>{employee.title}</td>
                                  <td className=' flex px-3 max-phone:hidden justify-between items-center phone:h-10'>
                                    <div  className='text-center w-full'>
                                    {employee.role}
                                    </div> 
                                    <div className='flex gap-x-2'>
                                      <FaUserEdit onClick={() => { editHandler(employee) }} className='cursor-pointer max-phone:text-[0.75rem] hover:scale-[1.2] transition-all duration-300 ease-in-out' />
                                      <MdDelete onClick={() => { handleDelete(employee._id) }} className='cursor-pointer max-phone:text-[0.75rem] hover:scale-[1.2] transition-all duration-300 ease-in-out' />
                                    </div>
                                  </td>
                                </tr>
                              ))
                          }
                      </tbody>
                    </table>
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
