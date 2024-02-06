import React, { useState } from 'react'
import img from "../assets/image.jpg";
import EmployeeForm from './EmployeeForm';
import Toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        department: "",
        role: "",
    });
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        });
    }

    const submitHandler = async (event) => {
        try {
          event.preventDefault();
          
          const url = process.env.REACT_APP_BACKEND_URL;

          const newEmployee = await fetch(`${url}/createEmployee`, {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({...formData}),
          });

          if(newEmployee.ok) {
            Toast.success("Employee Created Successfully");

            setFormData({
                name: "",
                email: "",
                title: "",
                department: "",
                role: ""
            });
            navigate('/');
          }
        } catch (error) {
          console.log(error);
          Toast.error("Fail to create entry");
        }
    }

  return (
    <div className='w-10/12 py-3 min-h-[100vh] items-center mx-auto flex '>
      <div className='w-[50%] max-ipad:hidden flex items-center h-[75%]'>
        <img src={img} alt="" className='h-[80%] rounded-lg w-[90%] object-fit max-lg:object-contain' />        
      </div>
      <div className='w-[50%] max-ipad:w-[100%] flex justify-center items-center'>
        <EmployeeForm formData={formData} changeHandler={changeHandler} submitHandler={submitHandler} />
      </div>
    </div>
  )
}

export default AddEmployee
