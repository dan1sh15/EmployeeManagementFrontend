import React from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';

const DeleteModal = (props) => {
    const { deleteHandler, userId, setShowDltModal } = props;
    const navigate = useNavigate();

    const clickHandler = async () => {
        await deleteHandler(userId);
    }

  return (
    <div className='flex poppins justify-center items-center h-[50vh] rounded-lg w-[100%] bg-[#353449]'>
        <div className='flex flex-col rounded-lg justify-center gap-y-5 items-center bg-[#272937] max-md:w-[80%] w-[40%]  h-fit max-phone:p-3 p-5'> 
            <h1 className='text-xl text-center max-phone:text-xs max-md:text-sm text-white'>Are your sure you want to delete Employee details?</h1>
            <div className='flex gap-x-3 max-[200px]:w-full items-center jusitfy-center max-[200px]:flex-col max-[200px]:gap-y-3 '>
                <button onClick={() => { setShowDltModal(false); navigate('/') }} className='px-3 py-2 max-[200px]:w-full bg-green-600 max-md:text-sm  max-phone:text-xs rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out'>No</button>
                <button onClick={clickHandler} className='px-3 max-[200px]:w-full max-md:text-sm max-phone:text-xs py-2 bg-red-800 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out'>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal;
