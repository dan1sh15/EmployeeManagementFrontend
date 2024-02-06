import { createContext, useState } from 'react';
import Toast from 'react-hot-toast';

// create context
export const AppContext = createContext();

function AppContextProvider( { children } ) {
    const [loading, setLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);

    const fetchEmployeeData = async () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/getAllEmployee';
        try {
            setLoading(true);
            const response = await fetch(url);

            if(response.ok) {
                const res = await response.json();
                setEmployeeData(res.data);
                Toast.success("Data fetched successfully");
            } else {
                Toast.error("Error fetching data");
            }
            setLoading(false);

        } catch (error) {
            console.error(error);
            console.log(error);
            console.log("Error fetching data");
            Toast.error("Error fetching data");
            setLoading(false);
        }
    };

    const value = {
        loading,
        setLoading,
        employeeData,
        setEmployeeData,
        fetchEmployeeData
    };

    return <AppContext.Provider value={value}>
        { children }
    </AppContext.Provider>
};

export default AppContextProvider;