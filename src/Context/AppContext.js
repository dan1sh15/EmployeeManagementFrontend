import { createContext, useState } from 'react';
import Toast, { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// create context
export const AppContext = createContext();

function AppContextProvider( { children } ) {
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);
    const [adminDetails, setAdminDetails] = useState({});

    const navigate = useNavigate();

    const fetchUserDetails = async () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/getUserDetails';
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });

        const responseData = await response.json();

        if(responseData.success) {
            setAdminDetails(responseData.user);
        } else {
            Toast.error(responseData.message);
        }
    }

    const fetchEmployeeData = async () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/getAllEmployee';
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            });
            const responseData = await response.json();

            if(responseData.success) {
                setEmployeeData(responseData.data);
            }
            else if(responseData.message === "Invalid token") {
                Toast.error(responseData.message);
                setLoggedIn(false);
                navigate('/login');
            } 
            else {
                console.log("Else condition");
                Toast.error(responseData.message);
            }
            setLoading(false);

        } catch (error) {
            Toast.error("Error fetching data");
            setLoading(false);
        }
    };

    const value = {
        loading,
        setLoading,
        employeeData,
        setEmployeeData,
        fetchEmployeeData,
        loggedIn,
        setLoggedIn,
        adminDetails,
        setAdminDetails,
        fetchUserDetails
    };

    return <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
};

export default AppContextProvider;